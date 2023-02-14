import { cx } from 'classix';
import { useScrollToTop } from '../../hooks';
import { ArrowUp } from '../../icons';

export const ScrollToTopButton = () => {
  const { visible, scrollToTop } = useScrollToTop();
  return (
    <button
      onClick={scrollToTop}
      className={cx(
        'fixed right-16 bottom-16 p-2 rounded hover:bg-orange-500 active:bg-orange-600 bg-orange-400 text-white shadow-lg',
        !visible && 'hidden'
      )}
    >
      <ArrowUp />
    </button>
  );
};
