import { Dialog, Listbox } from '@headlessui/react';
import { cx } from 'classix';
import { useEffect, useState } from 'react';
import { usePersistedValue, useScrollToTop } from './hooks';
import {
  ArrowUp,
  Masonry,
  Close,
  Plus,
  Grid,
  GitHub,
  Sun,
  Moon,
  RotateCcw,
} from './icons';

interface Image {
  id: string;
  url: string;
  height: number;
  width: number;
}

interface CatBreed {
  id: string;
  name: string;
  description: string;
}

/// https://picsum.photos/v2/list?page=1&limit=5

// const apiUrl =
//   'https://api.thecatapi.com/v1/images/search?limit=50&breed_ids=beng&api_key=live_c9jHeIqNkOhxkKcunV3xJacsVqvYesMijmSABVztrXCyhPhOtmLxMCNdpaZcy7mz';

const catsUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';

const breedsUrl = 'https://api.thecatapi.com/v1/breeds';

function App() {
  const [darkMode, setDarkMode] = usePersistedValue('app:darkMode', false);
  const [images, setImages] = useState<Image[]>([]);
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [selectedBreeds, setSelectedBreeds] = usePersistedValue<string[]>(
    'filter:breeds',
    []
  );
  const [expanded, setExpanded] = useState(false);
  const [uniform, setUniform] = usePersistedValue('filter:view', false);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<Image>();

  useEffect(() => {
    const url =
      selectedBreeds.length > 0
        ? `${catsUrl}&breed_ids=${selectedBreeds.join(',')}`
        : catsUrl;
    fetch(url)
      .then((x) => x.json())
      .then(setImages)
      .finally(() => setLoading(false));
  }, [selectedBreeds]);

  useEffect(() => {
    fetch(breedsUrl)
      .then((x) => x.json())
      .then(setBreeds);
  }, []);

  const { visible, scrollToTop } = useScrollToTop();

  const breedsToDisplay = expanded ? breeds : breeds.slice(0, 20);

  return (
    <div className={cx('h-full', darkMode && 'dark')}>
      <header className="p-2 flex flex-row-reverse sm:flex-col bg-gradient-to-b from-black to-black/50">
        <nav className="flex w-full h-12 justify-end gap-4 items-center max-w-5xl 2xl:max-w-7xl mx-auto">
          <a
            href="https://github.com/miroiu/catsplash"
            className="text-slate-500 hover:text-slate-200 p-1"
          >
            <GitHub size="md" />
          </a>
          <button
            onClick={() => setDarkMode((x) => !x)}
            title={darkMode ? 'Change to light theme' : 'Change to dark theme'}
            className="text-yellow-500 hover:text-yellow-300 p-1"
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
          <div className="sticky top-0 mb-16 drop-shadow-lg z-10">
            <Listbox
              value={selectedBreeds}
              onChange={setSelectedBreeds}
              multiple
            >
              <div className="relative rounded-b bg-white p-4 shadow-md">
                <div className="pb-4 flex gap-1">
                  <div className="grow">
                    <button
                      onClick={() => setExpanded((prev) => !prev)}
                      className="flex items-center gap-1 uppercase font-medium text-lg text-gray-600 hover:text-black"
                    >
                      {expanded ? <Close size="sm" /> : <Plus size="sm" />}
                      {expanded ? 'Less breeds' : 'More breeds'}
                    </button>
                  </div>
                  <button
                    disabled={!selectedBreeds.length}
                    onClick={() => setSelectedBreeds([])}
                    title="Clear filter"
                    className="flex items-center gap-1 uppercase font-medium text-lg text-gray-600 hover:text-black disabled:opacity-40 disabled:hover:text-gray-600 px-2"
                  >
                    <RotateCcw size="sm" />
                  </button>
                  <button
                    onClick={() => setUniform((prev) => !prev)}
                    title={uniform ? 'Waterfall' : 'Uniform'}
                    className="flex items-center gap-1 uppercase font-medium text-lg text-gray-600 hover:text-black px-2"
                  >
                    {uniform ? <Masonry size="md" /> : <Grid size="md" />}
                  </button>
                </div>
                <Listbox.Options
                  static
                  className="flex gap-2 items-center flex-wrap"
                >
                  {breedsToDisplay.map((breed, index) => (
                    <Listbox.Option
                      key={index}
                      as="button"
                      value={breed.id}
                      className="p-2 rounded shrink-0 flex-1 whitespace-nowrap select-none hover:text-white active:text-white hover:bg-orange-600 hover:border-orange-600 active:border-orange-700 active:bg-orange-700 ui-selected:bg-orange-600 ui-selected:text-white ui-selected:border-orange-600 ui-selected:active:border-orange-700 ui-selected:active:bg-orange-700 border-2 border-orange-200 cursor-paw"
                      title={breed.description}
                    >
                      <span>{breed.name}</span>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
          <main className="columns-1 md:columns-2 lg:columns-3 min-h-full">
            {loading
              ? Array.from({ length: 10 }).map((x, i) => (
                  <div
                    className={cx(
                      'bg-slate-300 mb-4 animate-pulse rounded',
                      uniform ? 'h-80' : i % 2 === 0 ? 'h-96' : 'h-[32rem]'
                    )}
                  />
                ))
              : images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setImagePreview(image)}
                    className="rounded drop-shadow-lg mb-4 overflow-hidden cursor-zoom-in w-full h-full"
                  >
                    <img
                      key={image.id}
                      src={image.url}
                      className={cx(
                        'w-full hover:scale-105 transition-transform',
                        uniform && 'h-80 object-cover'
                      )}
                    />
                  </button>
                ))}
          </main>
        </div>
      </div>
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
          <Dialog.Title className="fixed top-0 py-4 w-full flex justify-center bg-black/40 shadow-lg">
            <button
              onClick={() => setImagePreview(undefined)}
              className="p-3 rounded-full text-slate-300 border-4 border-slate-300 hover:border-slate-50 hover:text-slate-50"
            >
              <Close />
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
      <button
        onClick={scrollToTop}
        className={cx(
          'fixed right-16 bottom-16 p-2 rounded hover:bg-orange-500 active:bg-orange-600 bg-orange-400 text-white shadow-lg',
          !visible && 'hidden'
        )}
      >
        <ArrowUp />
      </button>
    </div>
  );
}

export default App;
