import { useSyncExternalStore } from 'react';

const subscribe = (callback) => {
  window.addEventListener('scroll', callback);
  return () => {
    window.removeEventListener('scroll', callback);
  };
};

export const useScrollToTop = (offset: number = 300) => {
  const visible = useSyncExternalStore(
    subscribe,
    () => document.documentElement.scrollTop > offset,
    () => false
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { visible, scrollToTop };
};

// export const useScrollToTop = () => {
//   const [visible, setVisible] = useState(
//     document.documentElement.scrollTop > 300
//   );

//   useEffect(() => {
//     const callback = () => setVisible(false);

//     window.addEventListener('scroll', callback);
//     return () => {
//       window.removeEventListener('scroll', callback);
//     };
//   });

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'auto' });
//   };

//   return { visible, scrollToTop };
// };
