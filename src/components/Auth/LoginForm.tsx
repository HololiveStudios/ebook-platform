import React, { useState } from 'react';
import { Input } from '@/components/Common/Input';
import { Button } from '@/components/Common/Button';
import { Alert } from '@/components/Common/Alert';
import { validateEmail } from '@/utils/validators';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onSwitchToRegister
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }

    if (password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        required
        autoComplete="email"
      />

      <Input
        type="password"
        label="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />

      <Button type="submit" fullWidth loading={loading}>
        Entrar
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          Não tem conta? Cadastre-se
        </button>
      </div>

      {/* Test credentials info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
        <p className="font-semibold mb-1">👤 Usuário de teste:</p>
        <p>Email: user@test.com</p>
        <p>Senha: 123456</p>
      </div>
    </form>
  );
};