import * as React from 'react';
import { Store, BookOpen, Upload } from 'lucide-react';
import { PageType } from '@/types';
import { useAppContext } from '@/contexts/AppContext';

interface NavigationProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

const ALLOWED_ADMINS = [
  'carlos@gmail.com',
  'admin2@email.com',
  'admin3@email.com',
];

export const Navigation: React.FC<NavigationProps> = ({
  isMobile = false,
  onNavigate
}) => {
  const { currentPage, setCurrentPage, user, loading } = useAppContext();

  if (loading) return null;

const navItems: { id: PageType; label: string; icon: any }[] = [
  { id: 'store' as PageType, label: 'Loja', icon: Store },
  { id: 'mybooks' as PageType, label: 'Meus Livros', icon: BookOpen },
  ...(user && ALLOWED_ADMINS.includes(user.email)
    ? [{ id: 'admin' as PageType, label: 'Admin', icon: Upload }]
    : []),
];

  const handleNavClick = (page: PageType) => {
    setCurrentPage(page);
    if (onNavigate) onNavigate();
  };

  if (isMobile) {
    return (
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                font-medium transition-colors
                ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md
              font-medium transition-all duration-200
              ${isActive ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden lg:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
