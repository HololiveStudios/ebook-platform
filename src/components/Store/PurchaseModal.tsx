import React, { useState } from 'react';
import { CreditCard, AlertCircle, Check, FileText } from 'lucide-react';
import { Product } from '@/types';
import { Modal } from '@/components/Common/Modal';
import { Button } from '@/components/Common/Button';
import { Alert } from '@/components/Common/Alert';
import { Badge } from '@/components/Common/Badge';
import { formatPrice } from '@/utils/formatters';
import { useAuth } from '@/hooks/useAuth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface PurchaseModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!product) return null;

  const handleConfirm = async () => {
    if (!user?.uid) {
      setError('Você precisa estar logado para comprar');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'purchases'), {
        productId: product.id,
        price: product.price,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar compra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Compra" size="md">
      {success ? (
        <div className="text-center py-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Compra realizada!
          </h3>
          <p className="text-gray-600">
            Você já pode acessar seu eBook em "Meus Livros"
          </p>
        </div>
      ) : (
        <>
          {error && (
            <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
          )}

          <div className="mb-6">
            <div className="flex gap-4">
              <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.coverUrl ? (
                  <img
                    src={product.coverUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.author}</p>
                <Badge variant="info" size="sm">
                  {product.format}
                </Badge>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-gray-800">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 text-lg">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-indigo-600 text-2xl">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>

          <Alert
            type="warning"
            title="Pagamento Simulado"
            message="Em produção, seria integrado com Stripe, PayPal ou outro gateway de pagamento. Clique em 'Confirmar' para simular a compra."
            className="mb-6"
          />

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              variant="success"
              size="lg"
              fullWidth
              onClick={handleConfirm}
              loading={loading}
            >
              <CreditCard className="w-5 h-5" />
              Confirmar Compra
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
