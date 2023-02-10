import { Dialog } from '@headlessui/react';
import { cx } from 'classix';
import { PropsWithChildren, useState } from 'react';
import { CatImage } from './api';
import { BreedsFilter, Feed, ScrollToTopButton } from './components';
import { usePersistedValue } from './hooks';
import { Close, GitHub, Sun, Moon } from './icons';

const AppLayout = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = usePersistedValue('app:darkMode', false);
  return (
    <div className={cx('h-full', darkMode && 'dark')}>
      <header className="p-2 flex flex-row-reverse sm:flex-col bg-gradient-to-b from-black to-black/50">
        <nav className="flex w-full h-12 justify-end gap-2 items-center max-w-5xl 2xl:max-w-7xl mx-auto">
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
      <ScrollToTopButton />
    </div>
  );
};

const FeedLayout = () => {
  const [selectedBreeds, setSelectedBreeds] = usePersistedValue<string[]>(
    'filter:breeds',
    []
  );

  const [view, setView] = usePersistedValue<'uniform' | 'waterfall'>(
    'filter:view',
    'waterfall'
  );

  const [imagePreview, setImagePreview] = useState<CatImage>();

  return (
    <>
      <div className="sticky top-0 mb-16 drop-shadow-lg z-10">
        <BreedsFilter
          filter={selectedBreeds}
          onFilter={setSelectedBreeds}
          view={view}
          onViewChange={setView}
        />
      </div>
      <Feed onPreview={setImagePreview} filter={selectedBreeds} view={view} />
      {imagePreview && (
        <Dialog
          open={!!imagePreview}
          onClose={() => setImagePreview(undefined)}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Title className="fixed bottom-0 sm:top-0 sm:bottom-auto p-4 w-full flex justify-center sm:justify-end bg-black/40 shadow-lg">
              <button
                onClick={() => setImagePreview(undefined)}
                className="p-3 rounded-full text-slate-300 hover:text-slate-50"
              >
                <Close size="lg" />
              </button>
            </Dialog.Title>
            <Dialog.Panel className="w-full max-w-fit max-h-full rounded overflow-hidden shadow-2xl border-4 border-white/50">
              <img
                className="rounded"
                src={imagePreview?.url}
                width={imagePreview?.width}
                height={imagePreview?.height}
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

function App() {
  return (
    <AppLayout>
      <FeedLayout />
    </AppLayout>
  );
}

export default App;
