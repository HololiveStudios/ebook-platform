import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getMetadata
} from 'firebase/storage';
import { storage } from '@/config/firebase';

export const storageService = {
  // Upload product file (eBook)
  async uploadProductFile(
    productId: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      const fileRef = ref(storage, `products/${productId}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer upload do arquivo');
    }
  },

  // Upload cover image
  async uploadCover(file: File): Promise<string> {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const coverRef = ref(storage, `covers/${fileName}`);
      const snapshot = await uploadBytes(coverRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer upload da capa');
    }
  },

  // Get file download URL (with auth check on Storage Rules)
  async getFileDownloadURL(filePath: string): Promise<string> {
    try {
      const fileRef = ref(storage, filePath);
      const downloadURL = await getDownloadURL(fileRef);
      
      return downloadURL;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao obter URL do arquivo');
    }
  },

  // Delete file
  async deleteFile(filePath: string): Promise<void> {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao deletar arquivo');
    }
  },

  // Get file metadata
  async getFileMetadata(filePath: string) {
    try {
      const fileRef = ref(storage, filePath);
      const metadata = await getMetadata(fileRef);
      
      return metadata;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao obter metadados');
    }
  }
};