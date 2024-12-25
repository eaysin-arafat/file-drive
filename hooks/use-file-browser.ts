import { FileType } from '@/components/file-browser';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useOrganization, useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { useCallback, useMemo, useState } from 'react';

// Define types for the hook response
interface UseFileBrowserResult {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  type: Doc<'files'>['type'] | 'all';
  setType: React.Dispatch<React.SetStateAction<Doc<'files'>['type'] | 'all'>>;
  isAnyFilterActive: boolean;
  modifiedFiles: (Doc<'files'> & { isFavorite: boolean })[];
  resetFilters: () => void;
  isLoading: boolean;
}

export const useFileBrowser = (fileType: FileType): UseFileBrowserResult => {
  const { organization, isLoaded } = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<Doc<'files'>['type'] | 'all'>('all');

  const isAnyFilterActive = useMemo(() => {
    return !!query || type !== 'all';
  }, [query, type]);

  let orgId: string | undefined = undefined;
  if (isLoaded && user.isLoaded) {
    orgId = organization?.id ?? user.user?.id;
  }

  // Determine filter parameters based on fileType
  const deletedOnly = fileType === 'TRASH';
  const favoriteOnly = fileType === 'FAVORITE';

  // Query to get favorites
  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : 'skip'
  );

  // Query to get files based on filters
  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          type: type === 'all' ? undefined : type,
          query,
          favorites: favoriteOnly,
          deletedOnly
        }
      : 'skip'
  );

  const isLoading = !favorites || !files;

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorite: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      )
    })) ?? [];

  // Function to reset filters
  const resetFilters = useCallback(() => {
    setQuery('');
    setType('all');
  }, []);

  return {
    query,
    setQuery,
    type,
    setType,
    isAnyFilterActive,
    modifiedFiles,
    resetFilters,
    isLoading
  };
};
