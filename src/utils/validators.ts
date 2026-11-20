export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Senha deve ter no mínimo 6 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Senha deve conter pelo menos um número');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateProductForm = (data: {
  title: string;
  author: string;
  description: string;
  price: number;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Título deve ter no mínimo 3 caracteres';
  }

  if (!data.author || data.author.trim().length < 3) {
    errors.author = 'Autor deve ter no mínimo 3 caracteres';
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Descrição deve ter no mínimo 10 caracteres';
  }

  if (!data.price || data.price <= 0) {
    errors.price = 'Preço deve ser maior que zero';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};