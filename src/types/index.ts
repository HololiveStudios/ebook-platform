export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  format: 'PDF' | 'EPUB' | 'MOBI';
  coverUrl: string;
  fileUrl: string;
  fileSize?: number;
  pages?: number;
  language?: string;
  category?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  price: number;
  purchasedAt: Date;
  paymentMethod?: string;
  transactionId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PageType = 'store' | 'mybooks' | 'admin' | 'profile';