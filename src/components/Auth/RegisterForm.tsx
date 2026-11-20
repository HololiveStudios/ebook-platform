import React, { useState } from 'react';
import { Input } from '@/components/Common/Input';
import { Button } from '@/components/Common/Button';
import { Alert } from '@/components/Common/Alert';
import { validateEmail, validatePassword } from '@/utils/validators';

interface RegisterFormProps {
  onRegister: (email: string, password: string, displayName: string) => Promise<void>;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  onSwitchToLogin
}) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (displayName.trim().length < 3) {
      setError('Nome deve ter no mínimo 3 caracteres');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0]);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      await onRegister(email, password, displayName);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <Input
        type="text"
        label="Nome completo"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="João Silva"
        required
        autoComplete="name"
      />

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
        autoComplete="new-password"
        helperText="Mínimo 6 caracteres com letras e números"
      />

      <Input
        type="password"
        label="Confirmar senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="new-password"
      />

      <Button type="submit" fullWidth loading={loading}>
        Criar Conta
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          Já tem conta? Entre
        </button>
      </div>
    </form>
  );
};
