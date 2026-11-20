import React from 'react';
import { ShoppingCart, Check, Lock, FileText } from 'lucide-react';
import { Product } from '@/types';
import { Card } from '@/components/Common/Card';
import { Badge } from '@/components/Common/Badge';
import { Button } from '@/components/Common/Button';
import { formatPrice } from '@/utils/formatters';

interface ProductCardProps {
  product: Product;
  hasAccess: boolean;
  onPurchase: (product: Product) => void;
  onView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hasAccess,
  onPurchase,
  onView
}) => {
  return (
    <Card padding="none" hover className="overflow-hidden group">
      {/* Cover Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {product.coverUrl ? (
          <img
            src={product.coverUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://lh3.google.com/u/0/d/1aDxNTONhMRCpiH8vdCfFOQbr8l6imWHb=w1920-h957-iv1?auditContext=thumbnail&auditContext=prefetch';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {hasAccess ? (
            <Badge variant="success" size="sm">
              <Check className="w-3 h-3 mr-1" />
              Adquirido
            </Badge>
          ) : (
            <Badge variant="default" size="sm">
              <Lock className="w-3 h-3 mr-1" />
              Bloqueado
            </Badge>
          )}
        </div>

        {/* Format Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="info" size="sm">
            {product.format}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">{product.author}</p>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-xs text-gray-500 mb-1">Preço</p>
            <p className="text-2xl font-bold text-indigo-600">
              {formatPrice(product.price)}
            </p>
          </div>

          {hasAccess ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => onView(product)}
            >
              Abrir
            </Button>
          ) : (
            <Button
              variant="success"
              size="md"
              onClick={() => onPurchase(product)}
            >
              <ShoppingCart className="w-4 h-4" />
              Comprar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};