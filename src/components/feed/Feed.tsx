import cx from 'classix';
import { memo, useEffect, useState } from 'react';
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
      className="rounded drop-shadow-lg mb-4 overflow-hidden cursor-zoom-in w-full h-full"
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

export const Feed = ({ filter, view }: FeedProps) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<CatImage[]>([]);

  const [, previewImage] = usePreviewCatImage() || [];

  useEffect(() => {
    catsClient
      .getCats(filter)
      .then(setImages)
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <main className="columns-1 md:columns-2 lg:columns-3 min-h-full">
      {loading
        ? Array.from({ length: 10 }).map((_, i) => (
            <FeedItemSkeleton key={i} index={i} view={view} />
          ))
        : images.map(image => (
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
