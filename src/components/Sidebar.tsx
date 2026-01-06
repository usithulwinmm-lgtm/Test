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

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t, language } = useLanguage();
  const { signOut } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-gradient">CryptoEx</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.key}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary/20 text-primary glow-primary'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                language === 'my' && 'font-myanmar'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{t(item.key)}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button
          onClick={signOut}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg w-full',
            'text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-colors',
            language === 'my' && 'font-myanmar'
          )}
        >
          <LogOut className="h-5 w-5" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
};
