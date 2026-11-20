import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 p-4 rounded-full">
          <Icon className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
};