import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Product } from '@/types';
import { PageContainer } from '@/components/Layout/PageContainer';
import { EmptyState } from '@/components/Layout/EmptyState';
import { ProductGrid } from '@/components/Store/ProductGrid';
import { ViewModal } from '@/components/Viewer/ViewModal';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/Common/Button';
import { useAppContext } from '@/contexts/AppContext';

export const MyBooksPage: React.FC = () => {
  const { purchasedProducts } = useProducts();
  const { setCurrentPage } = useAppContext();
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  if (purchasedProducts.length === 0) {
    return (
      <PageContainer title="Meus Livros">
        <EmptyState
          icon={BookOpen}
          title="Nenhum livro adquirido"
          description="Você ainda não possui nenhum eBook. Explore nossa loja e adquira seus primeiros materiais de estudo!"
          action={
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentPage('store')}
            >
              Ir para a Loja
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Meus Livros"
      subtitle={`Você possui ${purchasedProducts.length} ${
        purchasedProducts.length === 1 ? 'livro' : 'livros'
      }`}
    >
      <ProductGrid
        products={purchasedProducts}
        hasAccess={() => true}
        onPurchase={() => {}}
        onView={setViewingProduct}
      />

      <ViewModal
        product={viewingProduct}
        isOpen={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
      />
    </PageContainer>
  );
};