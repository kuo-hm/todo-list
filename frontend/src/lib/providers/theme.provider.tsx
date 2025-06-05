import { Theme } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ThemeType } from '../context/theme.context';
import { ThemeContext } from '../context/theme.context';

type AppearanceType = 'light' | 'dark';

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const getSystemTheme = (): ThemeType => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const storedTheme = (localStorage.getItem('theme') as ThemeType | null) ?? 'system';
  const [theme, setTheme] = useState<ThemeType>(storedTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ThemeType>(
    storedTheme === 'system' ? getSystemTheme() : storedTheme
  );

  const applyTheme = useCallback((newTheme: ThemeType) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);

    const finalTheme = newTheme === 'system' ? getSystemTheme() : newTheme;
    setResolvedTheme(finalTheme);

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(finalTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, applyTheme]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const systemTheme = getSystemTheme();
      setResolvedTheme(systemTheme);

      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(systemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    handleChange();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  useEffect(() => {
    applyTheme(storedTheme);
  }, [storedTheme, applyTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme: applyTheme,
    }),
    [theme, toggleTheme, applyTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <Theme appearance={resolvedTheme as AppearanceType} grayColor="mauve">
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}
