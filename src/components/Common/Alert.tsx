import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  className = ''
}) => {
  const config = {
    success: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    error: {
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      icon: XCircle,
      iconColor: 'text-red-500'
    },
    warning: {
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      icon: AlertCircle,
      iconColor: 'text-yellow-500'
    },
    info: {
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
      icon: Info,
      iconColor: 'text-blue-500'
    }
  };

  const { bgColor, textColor, borderColor, icon: Icon, iconColor } = config[type];

  return (
    <div
      className={`
        ${bgColor} ${textColor} ${borderColor}
        border rounded-lg p-4 flex items-start gap-3
        ${className}
      `}
    >
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-70 transition flex-shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};