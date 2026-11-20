import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  actions
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {(title || actions) && (
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {title && (
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-2 text-gray-600">{subtitle}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};