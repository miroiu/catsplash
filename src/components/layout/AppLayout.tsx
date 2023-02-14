import cx from 'classix';
import { PropsWithChildren } from 'react';
import { GitHub, Sun, Moon } from '../../icons';
import { usePersistedValue } from '../../hooks';

export const AppLayout = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = usePersistedValue('app:darkMode', false);
  return (
    <div className={cx('h-full', darkMode && 'dark')}>
      <header className="p-2 flex flex-row-reverse sm:flex-col bg-gradient-to-b from-black to-black/50">
        <nav className="flex w-full h-12 justify-end gap-2 items-center max-w-5xl 2xl:max-w-7xl mx-auto z-10">
          <a
            target="_blank"
            href="https://github.com/miroiu/catsplash"
            className="text-slate-200 p-2 bg-white/10 hover:bg-white/20 rounded"
          >
            <GitHub size="md" />
          </a>
          <button
            onClick={() => setDarkMode(x => !x)}
            title={darkMode ? 'Change to light theme' : 'Change to dark theme'}
            className="text-yellow-300 p-2 bg-white/10 hover:bg-white/20 rounded"
          >
            {darkMode ? <Sun size="md" /> : <Moon size="md" />}
          </button>
        </nav>
        <div className="relative flex justify-center items-center sm:-skew-y-2 text-3xl sm:text-7xl md:text-8xl lg:text-9xl font-black sm:py-16 md:py-28 splash-shadow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-300">
            CAT
          </span>
          🙀
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-yellow-300 splash-shadow">
            SPLASH
          </span>
        </div>
      </header>
      <div className="bg-yellow-50/95 dark:bg-slate-900/95 min-h-full">
        <div className="relative max-w-5xl 2xl:max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
