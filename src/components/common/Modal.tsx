import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      <div 
        className={`relative w-full ${widthClasses[maxWidth]} bg-white border border-slate-300 rounded-md shadow-xl overflow-hidden flex flex-col max-h-[90vh] z-10`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header - Government Deep Navy Accent Banner */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded transition-colors"
            title="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-slate-800 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
