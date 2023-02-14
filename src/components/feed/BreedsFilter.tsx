import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import cx from 'classix';
import useSWR from 'swr';
import { Close, Masonry, Plus, RotateCcw, Grid } from '../../icons';
import { catsClient } from '../../api';

export type ViewType = 'uniform' | 'waterfall';

export interface BreedsFilterProps {
  filter: string[];
  onFilter: (selectedBreeds: string[]) => void;
  view?: 'uniform' | 'waterfall';
  onViewChange?: (view: ViewType) => void;
}

const default_breeds_count = 10;

export const BreedsFilter = ({
  filter,
  onFilter,
  view = 'waterfall',
  onViewChange,
}: BreedsFilterProps) => {
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading } = useSWR('cat:breeds', catsClient.getBreeds, {
    revalidateOnFocus: false,
  });

  const breedsToDisplay = expanded
    ? data
    : data?.slice(0, default_breeds_count);

  const uniform = view === 'uniform';

  return (
    <Listbox value={filter} onChange={onFilter} multiple>
      <div className="relative rounded-b bg-white shadow-md">
        <div className="bg-white p-4 sticky sm:static top-0 flex gap-1">
          <div className="grow">
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="flex items-center gap-1 uppercase font-medium text-lg text-gray-600 hover:text-black"
            >
              {expanded ? <Close size="sm" /> : <Plus size="sm" />}
              {expanded ? 'Less breeds' : 'More breeds'}
            </button>
          </div>
          <button
            disabled={!filter.length}
            onClick={() => onFilter([])}
            title="Clear filter"
            className="flex items-center gap-1 uppercase font-medium text-lg text-gray-600 hover:text-black disabled:opacity-40 disabled:hover:text-gray-600 px-2"
          >
            <RotateCcw size="sm" />
          </button>
          <button
            disabled={!onViewChange}
            onClick={() => onViewChange?.(uniform ? 'waterfall' : 'uniform')}
            title={uniform ? 'Waterfall' : 'Uniform'}
            className="md:hidden flex items-center gap-1 uppercase font-medium text-lg text-gray-600 hover:text-black px-2"
          >
            {uniform ? <Masonry size="md" /> : <Grid size="md" />}
          </button>
        </div>
        <Listbox.Options
          static
          className={cx(
            'px-4 pb-4 max-h-screen overflow-y-auto sm:flex gap-2 items-center flex-wrap cursor-paw',
            expanded ? 'flex' : 'hidden'
          )}
        >
          {isLoading
            ? Array.from({ length: default_breeds_count }).map((_, i) => (
                <div
                  key={i}
                  className="rounded shrink-0 flex-1 animate-pulse border-2 border-orange-200"
                >
                  <span className="collapse">BREED NO {i}</span>
                </div>
              ))
            : breedsToDisplay?.map(breed => (
                <Listbox.Option
                  key={breed.id}
                  as="button"
                  value={breed.id}
                  className="px-2 rounded shrink-0 flex-1 whitespace-nowrap select-none hover:text-white active:text-white hover:bg-orange-600 hover:border-orange-600 active:border-orange-700 active:bg-orange-700 ui-selected:bg-orange-600 ui-selected:text-white ui-selected:border-orange-600 ui-selected:active:border-orange-700 ui-selected:active:bg-orange-700 border-2 border-orange-200 cursor-paw"
                  title={breed.description}
                >
                  <span>{breed.name}</span>
                </Listbox.Option>
              ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
