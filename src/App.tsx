import React, { useState } from 'react';
import { AppProvider, useAppContext } from '@/contexts/AppContext';
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';
import { Header } from '@/components/Layout/Header';
import { MobileMenu } from '@/components/Layout/MobileMenu';
import { StorePage } from '@/components/Store/StorePage';
import { MyBooksPage } from '@/components/MyBooks/MyBooksPage';
import { AdminPage } from '@/components/Admin/AdminPage';
import { LoadingSpinner } from '@/components/Common/LoadingSpinner';

const AppContent: React.FC = () => {
  const { currentPage, loading } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner fullScreen text="Carregando..." />;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          mobileMenuOpen={mobileMenuOpen}
        />
        
        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main>
          {currentPage === 'store' && <StorePage />}
          {currentPage === 'mybooks' && <MyBooksPage />}
          {currentPage === 'admin' && <AdminPage />}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-sm text-gray-600">
              <p>© 2024 eBook Store. Plataforma de estudos particulares.</p>
              <p className="mt-2">
                Desenvolvido com React, TypeScript, Tailwind CSS e Firebase
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;