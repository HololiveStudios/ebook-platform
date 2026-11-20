import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuth } from '@/hooks/useAuth';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo/Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
            <Book className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          {isLogin ? 'Bem-vindo de volta!' : 'Criar sua conta'}
        </h1>
        
        <p className="text-center text-gray-600 mb-6">
          {isLogin 
            ? 'Entre para acessar seus eBooks' 
            : 'Cadastre-se e comece a estudar hoje'}
        </p>

        {/* Forms */}
        {isLogin ? (
          <LoginForm
            onLogin={login}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm
            onRegister={register}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t text-center text-xs text-gray-500">
          <p>Ao continuar, você concorda com nossos</p>
          <p>
            <a href="#" className="text-indigo-600 hover:underline">Termos de Serviço</a>
            {' e '}
            <a href="#" className="text-indigo-600 hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
};