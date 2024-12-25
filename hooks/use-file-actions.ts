import { FileType } from '@/components/file-browser';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';

export const useFileActions = (file: Doc<'files'>, fileType: FileType) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const fileInfo = useQuery(api.files.getFileUrl, { fileId: file._id });
  const me = useQuery(api.users.getMe);

  const fileUrl = fileInfo?.url;
  const fileName = fileInfo?.name;

  const handleToggleFavorite = (fileId: Id<'files'>) => {
    if (fileType === 'TRASH') {
      toast.error("You can't favorite files in the Trash.");
      return;
    }

    toggleFavorite({ fileId });
    const toastMessage =
      fileType === 'FAVORITE' ? 'Removed from favorites' : 'Added to favorites';
    toast(toastMessage);
  };

  const handleDownload = () => {
    try {
      if (!fileUrl || !fileName) {
        toast.error('No file URL or name found.');
        return;
      }

      if (!fileUrl.startsWith('http') && !fileUrl.startsWith('https')) {
        toast.error('Invalid file URL.');
        return;
      }

      const newWindow = window.open(fileUrl, '_blank');

      if (newWindow) {
        newWindow.focus();
        toast.success('File opened in a new window.');
      } else {
        toast.error(
          'Failed to open the file in a new window. Please check your browser settings.'
        );
      }
    } catch (err) {
      console.error(err);
      toast.error('Error opening the file.');
    }
  };

  const handleDeleteOrRestore = async () => {
    if (file.shouldDelete) {
      await restoreFile({ fileId: file._id });
      toast('The file has been restored successfully.');
    } else {
      setIsConfirmOpen(true);
    }
  };

  return {
    isConfirmOpen,
    setIsConfirmOpen,
    handleToggleFavorite,
    handleDownload,
    handleDeleteOrRestore,
    fileUrl,
    fileName,
    me,
    deleteFile
  };
};
