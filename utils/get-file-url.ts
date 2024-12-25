import { Id } from '@/convex/_generated/dataModel';

export const getFileUrl = (fileId: Id<'_storage'>) => {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
};
