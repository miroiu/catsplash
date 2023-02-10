import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { CatImage } from '../../api';

type CatImagePreviewContext = [
  CatImage | undefined,
  (image?: CatImage) => void
];

const CatImagePreviewContext = createContext<CatImagePreviewContext>(
  undefined!
);

export const CatImagePreviewContextProvider = ({
  children,
}: PropsWithChildren) => {
  const state = useState<CatImage>();

  return (
    <CatImagePreviewContext.Provider value={state}>
      {children}
    </CatImagePreviewContext.Provider>
  );
};

export const usePreviewCatImage = () => useContext(CatImagePreviewContext);
