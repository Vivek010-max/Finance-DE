import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GlassSidebar } from '../components/GlassSidebar';
import { AICoPilotChat } from '../components/AICoPilotCha';
import { ThemeToggle, type DashboardTheme } from '../components/ThemeToggle';

export const DashboardLayout: React.FC = () => {
  const [themeFlashKey, setThemeFlashKey] = useState(0);
  const [theme, setTheme] = useState<DashboardTheme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem('onlyfinance-dashboard-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    window.localStorage.setItem('onlyfinance-dashboard-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
    setThemeFlashKey((currentKey) => currentKey + 1);
  };

  return (
    <div data-theme={theme} className="dashboard-theme min-h-screen bg-canvas text-(--text-primary) overflow-hidden relative selection:bg-black/15 transition-colors duration-500">
      <div className="financial-aurora" />
      <div className="theme-drift-layer" />
      {themeFlashKey > 0 && <div key={themeFlashKey} className="theme-switch-flash" />}
      <div className="absolute right-4 top-4 z-20 md:right-6 md:top-5">
        <ThemeToggle
          theme={theme}
          onToggle={handleToggleTheme}
        />
      </div>
      
      <div className="max-w-400 mx-auto h-screen px-4 md:px-6 py-4 grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_320px] gap-4">
        <GlassSidebar />

        <main className="flex flex-col h-full overflow-y-auto pr-1 pb-4 custom-scrollbar relative z-10 animate-in fade-in duration-500">
           <Outlet />
        </main>

        <AICoPilotChat />
      </div>
    </div>
  );
};




