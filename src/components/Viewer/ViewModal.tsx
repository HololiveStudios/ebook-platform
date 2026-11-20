import React from 'react';
import { X, Download, BookOpen, FileText } from 'lucide-react';
import { Product } from '@/types';
import { Modal } from '@/components/Common/Modal';
import { Button } from '@/components/Common/Button';
import { Badge } from '@/components/Common/Badge';
import { Alert } from '@/components/Common/Alert';

interface ViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewModal: React.FC<ViewModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  if (!product) return null;

  const handleDownload = () => {
    // In production, this would download from Firebase Storage with authentication
    alert('Em produção, o download seria feito através do Firebase Storage com autenticação.');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title=""
      showCloseButton={false}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-3">{product.author}</p>
            <div className="flex gap-2">
              <Badge variant="info">{product.format}</Badge>
              {product.category && (
                <Badge variant="default">{product.category}</Badge>
              )}
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Alert
            type="info"
            title="Visualizador de eBook"
            message="Em produção, o arquivo seria carregado do Firebase Storage com autenticação rigorosa. Apenas usuários autorizados podem acessar o conteúdo."
          />

          {/* Simulated Viewer */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <BookOpen className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Conteúdo do eBook
              </h3>
              <p className="text-gray-600 mb-4">
                <strong>Arquivo:</strong> {product.fileUrl}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                O viewer seria implementado usando bibliotecas como PDF.js para PDFs
                ou ePub.js para EPUBs, com streaming seguro do Firebase Storage.
              </p>
              
              <div className="flex gap-3 justify-center mt-6">
                <Button variant="primary" size="md" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                
                <Button variant="secondary" size="md">
                  <FileText className="w-4 h-4" />
                  Abrir em tela cheia
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold text-gray-800 mb-3">Sobre este eBook</h4>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};