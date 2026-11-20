import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Purchase } from '@/types';

export const purchasesService = {
  // Create purchase
  async createPurchase(
    userId: string,
    productId: string,
    price: number,
    paymentMethod?: string
  ): Promise<string> {
    try {
      const purchaseData = {
        userId,
        productId,
        price,
        paymentMethod: paymentMethod || 'simulated',
        transactionId: `TXN_${Date.now()}`,
        purchasedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'purchases'), purchaseData);
      
      return docRef.id;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar compra');
    }
  },

  // Get user purchases
  async getUserPurchases(userId: string): Promise<Purchase[]> {
    try {
      const q = query(
        collection(db, 'purchases'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        purchasedAt: doc.data().purchasedAt?.toDate()
      })) as Purchase[];
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar compras');
    }
  },

  // Check if user has purchased product
  async hasPurchased(userId: string, productId: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, 'purchases'),
        where('userId', '==', userId),
        where('productId', '==', productId)
      );
      const querySnapshot = await getDocs(q);
      
      return !querySnapshot.empty;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao verificar compra');
    }
  },

  // Get purchased products IDs
  async getPurchasedProductIds(userId: string): Promise<string[]> {
    try {
      const purchases = await this.getUserPurchases(userId);
      return purchases.map(p => p.productId);
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar produtos comprados');
    }
  }
};