import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  AppLayout,
  ImagePreviewContextProvider,
  FeedLayout,
  ImagePreviewDialog,
  ScrollToTopButton,
} from './components';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppLayout>
      <ImagePreviewContextProvider>
        <FeedLayout />
        <ImagePreviewDialog />
      </ImagePreviewContextProvider>
      <ScrollToTopButton />
    </AppLayout>
  </React.StrictMode>
);
