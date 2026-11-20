import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Navigation } from './Navigation';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/Common/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAppContext();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-[73px] left-0 right-0 bg-white shadow-lg z-50 md:hidden border-t border-gray-100">
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="bg-indigo-100 p-2 rounded-full">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.displayName || 'Usuário'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <Navigation isMobile onNavigate={onClose} />

          {/* Logout Button */}
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};