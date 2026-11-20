import { useAppContext } from '@/contexts/AppContext';
import { useMemo } from 'react';

export const useProducts = () => {
  const {
    products,
    userPurchases,
    hasAccess,
    purchaseProduct,
    refreshProducts
  } = useAppContext();

  const purchasedProducts = useMemo(() => {
    return products.filter(p => userPurchases.includes(p.id));
  }, [products, userPurchases]);

  const availableProducts = useMemo(() => {
    return products.filter(p => !userPurchases.includes(p.id));
  }, [products, userPurchases]);

  return {
    allProducts: products,
    purchasedProducts,
    availableProducts,
    hasAccess,
    purchaseProduct,
    refreshProducts
  };
};