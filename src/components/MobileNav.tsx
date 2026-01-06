import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Wallet, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'dashboard', path: '/dashboard', icon: LayoutDashboard },
  { key: 'market', path: '/market', icon: TrendingUp },
  { key: 'wallet', path: '/wallet', icon: Wallet },
  { key: 'settings', path: '/settings', icon: Settings },
];

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const { t, language } = useLanguage();
  const { signOut } = useAuth();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.key}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
                language === 'my' && 'font-myanmar'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'animate-pulse-glow')} />
              <span className="text-xs">{t(item.key)}</span>
            </NavLink>
          );
        })}
        <button
          onClick={signOut}
          className={cn(
            'flex flex-col items-center gap-1 px-4 py-2 rounded-lg',
            'text-muted-foreground hover:text-destructive transition-colors',
            language === 'my' && 'font-myanmar'
          )}
        >
          <LogOut className="h-5 w-5" />
          <span className="text-xs">{t('logout')}</span>
        </button>
      </div>
    </nav>
  );
};
