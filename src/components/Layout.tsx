import React from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header />
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
};
