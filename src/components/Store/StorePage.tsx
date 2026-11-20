import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/types';
import { PageContainer } from '@/components/Layout/PageContainer';
import { ProductGrid } from './ProductGrid';
import { PurchaseModal } from './PurchaseModal';
import { Input } from '@/components/Common/Input';
import { Button } from '@/components/Common/Button';
import { useProducts } from '@/hooks/useProducts';

export const StorePage: React.FC = () => {
  const { allProducts, hasAccess, purchaseProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = allProducts.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.author.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleView = (product: Product) => {
    // Navigate to viewer (will be implemented in ViewModal)
    console.log('View product:', product);
  };

  const confirmPurchase = async (productId: string, price: number) => {
    await purchaseProduct(productId, price);
  };

  return (
    <PageContainer
      title="Loja de eBooks"
      subtitle="Explore nossa coleção de materiais de estudo"
    >
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título, autor ou assunto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </Button>
        </div>

        {/* Results Count */}
        <p className="mt-4 text-sm text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'} encontrado(s)
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        hasAccess={hasAccess}
        onPurchase={handlePurchase}
        onView={handleView}
      />

      {/* Purchase Modal */}
      <PurchaseModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConfirm={confirmPurchase}
      />
    </PageContainer>
  );
};