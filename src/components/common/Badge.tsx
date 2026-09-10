import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'rose' | 'sky' | 'indigo' | 'slate' | 'violet' | 'blue';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'slate', 
  size = 'sm',
  pulse = false 
}) => {
  // Institutional government status palette (accessible contrast, subtle borders)
  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-50 text-amber-900 border-amber-200',
    rose: 'bg-rose-50 text-rose-800 border-rose-200',
    sky: 'bg-sky-50 text-sky-800 border-sky-200',
    blue: 'bg-blue-50 text-blue-900 border-blue-200',
    indigo: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    violet: 'bg-purple-50 text-purple-900 border-purple-200',
    slate: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  const dotColors = {
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-600',
    rose: 'bg-rose-600',
    sky: 'bg-sky-600',
    blue: 'bg-blue-700',
    indigo: 'bg-indigo-600',
    violet: 'bg-purple-600',
    slate: 'bg-slate-500'
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-sm border ${variantStyles[variant]} ${sizeStyles[size]} tracking-tight`}
    >
      {pulse ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}></span>
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant]}`}></span>
        </span>
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}></span>
      )}
      <span>{children}</span>
    </span>
  );
};
