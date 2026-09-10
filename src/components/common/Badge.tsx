import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'rose' | 'sky' | 'indigo' | 'slate' | 'violet';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'slate', 
  size = 'sm',
  pulse = false 
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60',
    amber: 'bg-amber-950/70 text-amber-400 border-amber-800/60',
    rose: 'bg-rose-950/70 text-rose-400 border-rose-800/60',
    sky: 'bg-sky-950/70 text-sky-400 border-sky-800/60',
    indigo: 'bg-indigo-950/70 text-indigo-400 border-indigo-800/60',
    violet: 'bg-violet-950/70 text-violet-400 border-violet-800/60',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/60'
  };

  const dotColors = {
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    sky: 'bg-sky-400',
    indigo: 'bg-indigo-400',
    violet: 'bg-violet-400',
    slate: 'bg-slate-400'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  };

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} transition-colors`}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}></span>
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant]}`}></span>
        </span>
      )}
      {children}
    </span>
  );
};
