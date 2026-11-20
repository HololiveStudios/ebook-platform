import React from 'react';
import { Shield, Upload } from 'lucide-react';
import { PageContainer } from '@/components/Layout/PageContainer';
import { ProductForm } from './ProductForm';
import { Alert } from '@/components/Common/Alert';
import { productsService } from '@/services/products.service';
import { useAppContext } from '@/contexts/AppContext';

export const AdminPage: React.FC = () => {
  const { refreshProducts } = useAppContext();

  const handleSubmit = async (data: any) => {
    const productData = {
      title: data.title,
      author: data.author,
      description: data.description,
      price: parseFloat(data.price),
      format: data.format,
      coverUrl: data.coverUrl || 'https://lh3.googleusercontent.com/rd-d/ALs6j_Ecew6lCHgRRuWH9A137DhgPS1BEib_9c0XNTB7F0Iis0KR85LKpvp39VUamgsjSYCQtRC7Nb1shcMOQK0xawS7Up5CR28Rl6ruhkQZSAfVoTOEaRMJWeqZOLX6yrSsQUiekycMjzzO72KBMh01OCAeAq694gLIWVMnpFFvxDZBK1wj5KAEohauFL6-xjRpJOOe38kZiYmaVphGOlNUi54RerSx6UHs3seRXeVwyhGQNYB6FFYKFz_kQLjYvA57rdrxpeDqDUskTPCet3GvFzSwI-boJ43sUHMFh-tziknZrJAAw9j1krLdg7PzChnHnKO4L0aaMIB0fVpbVC8tNdmYH0Ti_OoaQfV-ewVZQFBtDqiTJiQrcuqrc2nDzYlJRcbcTBmSOBQGvFFtbdB3tnkfuVYpy8YBVW7YRytaOG6vA2aDFIqqOYMfPgxPJM2N9ohUdQAm_UQzNVHSP7G5LgCF80ttlnXe9FHvDPzsbwxGRr_zVk7FX0wiYn5tbkSPJnXr0DFUtJSafTYtwjuYvZljXujoT3MWo5Iq8bPYpMdqTvjVWPR-v2gnIuw5DPSQmLBO8FJd9GZphYbXCUSrO9IlnfFjInXWM_lgBL4MeS4L0vIa7zNIIHSijCB6vsI2icDCjuzvqMMGvvjcJ08OWk35MaMZG5L-g0ivhF68b07mizq7p3E-qylpY_OWfsVPP54V07A4U68VJ7xT66TfjJST5a3VGKjViOQNdIHTnUPByB3sUMmvWGNZXzGnkmWoYCwMpSYCO8i-636yb8eebxKgIvLaNl54W01JNsGSuCIqi7nLhP8TYTON-UbiAlDH_KljqvJmk2JS3ueL31AUDIT7-88dH4U6V_WRIKaIakKmAEVf-xrR5GG3RwVyiVNKjZsOgizuuKxj1EEK0qNoax5dGfJzWiKGQB6m6Z_EEMI-e-YlWZVGOn0bcj2lBwmzO7K2Vc-KC1_qefAtPhq7YQzlfToOB4YubqGLOABIYhqDh4XqbFx5AHT2jRZoSbEr7bCWQeIy9g=w1920-h957?auditContext=thumbnail&auditContext=prefetch',
      fileUrl: `products/${Date.now()}_${data.title.replace(/\s+/g, '_')}.${data.format.toLowerCase()}`,
      category: data.category || 'Geral',
      language: 'pt-BR'
    };

    await productsService.addProduct(productData);
    await refreshProducts();
  };

  return (
    <PageContainer
      title="Painel Administrativo"
      subtitle="Adicione novos eBooks à plataforma"
    >
      <div className="max-w-3xl mx-auto">
        <Alert
          type="warning"
          title="Área Administrativa"
          message="Em produção, esta área seria protegida com permissões específicas de admin no Firebase."
          className="mb-6"
        />

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Upload de eBook
              </h2>
              <p className="text-sm text-gray-600">
                Preencha os dados do novo produto
              </p>
            </div>
          </div>

          <ProductForm onSubmit={handleSubmit} />
        </div>
      </div>
    </PageContainer>
  );
};