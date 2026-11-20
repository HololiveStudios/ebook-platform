import React from 'react';
import { Book, Menu, X, User, LogOut } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/Common/Button';
import { Navigation } from './Navigation';

interface HeaderProps {
  onMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, mobileMenuOpen }) => {
  const { user, logout } = useAppContext();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg shadow-md">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">eBook Store</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Sua plataforma de estudos</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block flex-1 flex justify-center">
            <Navigation />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              <User className="w-4 h-4" />
              <span className="font-medium">{user?.email}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden text-gray-600 hover:text-gray-800 p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};