import { Dialog } from '@headlessui/react';
import { usePreviewImage } from '..';
import { Close } from '../../icons';

export const ImagePreviewDialog = () => {
  const [imagePreview, setImagePreview] = usePreviewImage();

  return (
    <Dialog
      open={!!imagePreview}
      onClose={() => setImagePreview(undefined)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Title className="fixed bottom-0 sm:top-0 sm:bottom-auto p-4 w-full flex justify-center sm:justify-end bg-black/40 shadow-lg">
          <button
            onClick={() => setImagePreview(undefined)}
            className="p-3 rounded-full text-slate-300 hover:text-slate-50"
          >
            <Close size="lg" />
          </button>
        </Dialog.Title>
        <Dialog.Panel className="w-full max-w-fit max-h-full rounded overflow-hidden shadow-2xl border-4 border-white/50">
          <img
            className="rounded"
            src={imagePreview?.url}
            width={imagePreview?.width}
            height={imagePreview?.height}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
