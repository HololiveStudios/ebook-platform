import React, { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/Common/Input';
import { Button } from '@/components/Common/Button';
import { Alert } from '@/components/Common/Alert';
import { Card } from '@/components/Common/Card';
import { validateProductForm } from '@/utils/validators';

interface ProductFormData {
  title: string;
  author: string;
  description: string;
  price: string;
  format: 'PDF' | 'EPUB' | 'MOBI';
  coverUrl: string;
  category?: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    author: '',
    description: '',
    price: '',
    format: 'PDF',
    coverUrl: '',
    category: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate
    const validation = validateProductForm({
      title: formData.title,
      author: formData.author,
      description: formData.description,
      price: parseFloat(formData.price)
    });

    if (!validation.isValid) {
      setError(Object.values(validation.errors)[0]);
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        author: '',
        description: '',
        price: '',
        format: 'PDF',
        coverUrl: '',
        category: ''
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao adicionar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <Alert
          type="success"
          title="Sucesso!"
          message="eBook adicionado com sucesso!"
          onClose={() => setSuccess(false)}
        />
      )}

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError('')}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="text"
          name="title"
          label="Título do eBook"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Matemática Avançada"
          required
        />

        <Input
          type="text"
          name="author"
          label="Autor"
          value={formData.author}
          onChange={handleChange}
          placeholder="Ex: Prof. João Silva"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Descreva o conteúdo do eBook..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          type="number"
          name="price"
          label="Preço (R$)"
          value={formData.price}
          onChange={handleChange}
          placeholder="49.90"
          step="0.01"
          min="0"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Formato <span className="text-red-500">*</span>
          </label>
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="PDF">PDF</option>
            <option value="EPUB">EPUB</option>
            <option value="MOBI">MOBI</option>
          </select>
        </div>

        <Input
          type="text"
          name="category"
          label="Categoria"
          value={formData.category}
          onChange={handleChange}
          placeholder="Ex: Matemática"
        />
      </div>

      <Input
        type="url"
        name="coverUrl"
        label="URL da Capa"
        value={formData.coverUrl}
        onChange={handleChange}
        placeholder="https://exemplo.com/capa.jpg"
        helperText="Deixe vazio para usar uma capa padrão"
      />

      <Card padding="md" className="bg-blue-50 border-2 border-dashed border-blue-200">
        <div className="text-center">
          <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-blue-900 mb-2">
            Upload de Arquivo
          </h4>
          <p className="text-sm text-blue-700 mb-4">
            Em produção, o arquivo seria enviado para o Firebase Storage com autenticação e controle de acesso rigoroso.
          </p>
          <Button type="button" variant="secondary" size="sm">
            <Upload className="w-4 h-4" />
            Selecionar Arquivo (Simulado)
          </Button>
        </div>
      </Card>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={loading}
      >
        <Upload className="w-5 h-5" />
        Adicionar eBook
      </Button>
    </form>
  );
};