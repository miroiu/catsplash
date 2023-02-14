import { usePersistedValue } from '../../hooks';
import { BreedsFilter, Feed } from '../feed';

export const FeedLayout = () => {
  const [selectedBreeds, setSelectedBreeds] = usePersistedValue<string[]>(
    'filter:breeds',
    []
  );

  const [view, setView] = usePersistedValue<'uniform' | 'waterfall'>(
    'filter:view',
    'uniform'
  );

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
      <Feed filter={selectedBreeds} view={view} />
    </>
  );
};
