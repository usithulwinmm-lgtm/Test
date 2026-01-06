import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '@/contexts/AuthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Mobile Logo */}
      <div className="lg:hidden">
        <h1 className="text-xl font-bold text-gradient">CryptoEx</h1>
      </div>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* Right section */}
      <div className="flex items-center gap-4">
        <LanguageSelector />
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-sm font-medium">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <span className="hidden sm:inline text-sm text-muted-foreground">
            {user?.email}
          </span>
        </div>
      </div>
    </header>
  );
};
