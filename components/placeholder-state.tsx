import { UploadButton } from './ui/upload-button';

const PlaceholderState = () => {
  return (
    <div className="my-[10%] flex flex-col items-center justify-center gap-6 text-center">
      <p className="text-xl font-semibold text-gray-700">
        No files found. Upload a file to get started.
      </p>
      <UploadButton />
      <p className="mt-4 text-sm text-gray-500">
        You can upload images, PDFs, or CSV files.
      </p>
    </div>
  );
};

export default PlaceholderState;
