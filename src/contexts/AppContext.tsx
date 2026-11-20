import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Product, Purchase, PageType } from '@/types';
import { authService } from '@/services/auth.service';
import { productsService } from '@/services/products.service';
import { purchasesService } from '@/services/purchases.service';

interface AppContextType {
  user: User | null;
  products: Product[];
  userPurchases: string[];
  currentUser?: { email: string };
  currentPage: PageType;
  loading: boolean;
  error: string | null;
  setCurrentPage: (page: PageType) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  purchaseProduct: (productId: string, price: number) => Promise<void>;
  hasAccess: (productId: string) => boolean;
  refreshProducts: () => Promise<void>;
  refreshPurchases: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [userPurchases, setUserPurchases] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<PageType>('store');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize app
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (authUser) => {
      setUser(authUser);
      
      if (authUser) {
        await loadUserData(authUser.id);
      } else {
        setUserPurchases([]);
      }
      
      setLoading(false);
    });

    loadProducts();

    return () => unsubscribe();
  }, []);

  const loadProducts = async () => {
    try {
      const allProducts = await productsService.getAllProducts();
      setProducts(allProducts);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      const purchasedIds = await purchasesService.getPurchasedProductIds(userId);
      setUserPurchases(purchasedIds);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
      await loadUserData(loggedUser.id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      const newUser = await authService.register(email, password, displayName);
      setUser(newUser);
      setUserPurchases([]);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setUserPurchases([]);
      setCurrentPage('store');
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const purchaseProduct = async (productId: string, price: number) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      setError(null);
      await purchasesService.createPurchase(user.id, productId, price);
      setUserPurchases(prev => [...prev, productId]);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const hasAccess = (productId: string): boolean => {
    return userPurchases.includes(productId);
  };

  const refreshProducts = async () => {
    await loadProducts();
  };

  const refreshPurchases = async () => {
    if (user) {
      await loadUserData(user.id);
    }
  };

  const value: AppContextType = {
    user,
    products,
    userPurchases,
    currentPage,
    loading,
    error,
    setCurrentPage,
    login,
    register,
    logout,
    purchaseProduct,
    hasAccess,
    refreshProducts,
    refreshPurchases
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};