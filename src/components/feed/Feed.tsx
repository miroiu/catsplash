import { memo } from 'react';
import cx from 'classix';
import useSWR from 'swr';
import { CatImage, catsClient } from '../../api';
import { ViewType } from './BreedsFilter';
import { usePreviewCatImage } from './CatImageContext';

interface FeedItemProps {
  image: CatImage;
  view?: ViewType;
  onPreview?: (image: CatImage) => void;
}

const FeedItem = memo(({ image, view, onPreview }: FeedItemProps) => {
  const uniform = view === 'uniform';
  return (
    <button
      onClick={() => onPreview?.(image)}
      className="rounded drop-shadow-lg mb-4 overflow-hidden cursor-zoom-in w-full h-full bg-slate-300"
    >
      <img
        src={image.url}
        className={cx(
          'w-full hover:scale-105 transition-transform',
          uniform && 'h-80 object-cover'
        )}
      />
    </button>
  );
});

const FeedItemSkeleton = ({
  index,
  view,
}: {
  index: number;
  view?: ViewType;
}) => {
  const uniform = view === 'uniform';
  return (
    <div
      className={cx(
        'bg-slate-300 mb-4 animate-pulse rounded',
        uniform ? 'h-80' : index % 2 === 0 ? 'h-96' : 'h-[32rem]'
      )}
    />
  );
};

export interface FeedProps {
  filter?: string[];
  view?: ViewType;
}

export const Feed = ({ filter = [], view }: FeedProps) => {
  const [, previewImage] = usePreviewCatImage() || [];

  const { data, isLoading } = useSWR('feed:cats' + filter.join(','), () =>
    catsClient.getCats(filter)
  );

  return (
    <main className="columns-1 md:columns-2 lg:columns-3 min-h-full">
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <FeedItemSkeleton key={i} index={i} view={view} />
          ))
        : data?.map(image => (
            <FeedItem
              key={image.id}
              image={image}
              onPreview={previewImage}
              view={view}
            />
          ))}
    </main>
  );
};
