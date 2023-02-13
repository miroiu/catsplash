import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { CatImage } from '../../api';

type ImagePreviewContext = [CatImage | undefined, (image?: CatImage) => void];

const ImagePreviewContext = createContext<ImagePreviewContext>(undefined!);

export const ImagePreviewContextProvider = ({
  children,
}: PropsWithChildren) => {
  const state = useState<CatImage>();

  return (
    <ImagePreviewContext.Provider value={state}>
      {children}
    </ImagePreviewContext.Provider>
  );
};

export const usePreviewImage = () => useContext(ImagePreviewContext);
