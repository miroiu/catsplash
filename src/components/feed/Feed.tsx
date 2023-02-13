import { memo, useEffect } from 'react';
import cx from 'classix';
import useSWR from 'swr/infinite';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { CatImage, catsClient } from '../../api';
import { ViewType } from './BreedsFilter';
import { usePreviewImage } from '../image-preview';

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
      className="rounded drop-shadow-lg overflow-hidden cursor-zoom-in w-full h-full bg-slate-300"
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

const columns = 4;

export const Feed = ({ filter = [], view }: FeedProps) => {
  const [, previewImage] = usePreviewImage() || [];

  const { data, isLoading, isValidating, size, setSize } = useSWR(
    index => `feed:cats${index}${filter.join(',')}`,
    () => catsClient.getCats(filter),
    { revalidateOnFocus: false, revalidateFirstPage: false }
  );

  const images = data?.flat(1) || [];

  const virtualizer = useWindowVirtualizer({
    count: Math.floor(images.length / columns) + 1,
    estimateSize: index =>
      view === 'uniform' ? 320 : index % 2 == 0 ? 384 : 512,
    overscan: 2,
  });
  const rows = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...rows].reverse();
    console.log((lastItem.index + 1) * columns, images.length);
    if (
      !isLoading &&
      !isValidating &&
      lastItem.index >= Math.floor((images.length - 1) / 4)
    ) {
      setSize(size => size + 1);
    }
  }, [rows, isLoading, isValidating]);

  return (
    <main style={{ height: virtualizer.getTotalSize() }}>
      <div
        style={{
          transform: `translateY(${rows[0].start}px)`,
        }}
      >
        {rows.map(virtualRow => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4 gap-4"
          >
            {Array.from({ length: columns }).map((_, i) =>
              images[virtualRow.index * columns + i] ? (
                <FeedItem
                  key={virtualRow.index * columns + i}
                  image={images[virtualRow.index * columns + i]}
                  onPreview={previewImage}
                  view={view}
                />
              ) : (
                <FeedItemSkeleton
                  key={virtualRow.index * columns + i}
                  index={virtualRow.index * columns + i}
                  view={view}
                />
              )
            )}
          </div>
        ))}
      </div>
    </main>
  );
};
