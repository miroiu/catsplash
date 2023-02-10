import { Listbox } from '@headlessui/react';
import { cx } from 'classix';
import { useEffect, useState } from 'react';
import { usePersistedValue, useScrollToTop } from './hooks';
import {
  ArrowUp,
  Masonry,
  Minus,
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

  useEffect(() => {
    const url =
      selectedBreeds.length > 0
        ? `${catsUrl}&breed_ids=${selectedBreeds.join(',')}`
        : catsUrl;
    fetch(url)
      .then((x) => x.json())
      .then(setImages);
  }, [selectedBreeds]);

  useEffect(() => {
    fetch(breedsUrl)
      .then((x) => x.json())
      .then(setBreeds);
  }, []);

  const { visible, scrollToTop } = useScrollToTop();

  const breedsToDisplay = expanded ? breeds : breeds.slice(0, 20);

  return (
    <div className="h-full">
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
            className="text-yellow-500 hover:text-yellow-300 p-1"
          >
            {darkMode ? <Sun size="md" /> : <Moon size="md" />}
          </button>
        </nav>
        <div className="relative flex justify-center items-center sm:-skew-y-2 text-3xl sm:text-7xl md:text-8xl lg:text-9xl font-black sm:py-16 md:py-28">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-300">
            CAT
          </span>
          🙀
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-yellow-300">
            SPLASH
          </span>
        </div>
      </header>
      <div className="bg-yellow-50/95 min-h-full">
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
                      {expanded ? <Minus size="sm" /> : <Plus size="sm" />}
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
            {images.map((image) => (
              <div
                key={image.id}
                className="rounded drop-shadow-lg mb-4 overflow-hidden cursor-zoom-in"
              >
                <img
                  key={image.id}
                  src={image.url}
                  className={cx(
                    'w-full hover:scale-105 transition-transform',
                    uniform && 'h-80 object-cover'
                  )}
                />
              </div>
            ))}
          </main>
        </div>
      </div>
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
