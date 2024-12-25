import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Doc } from '@/convex/_generated/dataModel';
import { useFileActions } from '@/hooks/use-file-actions';
import { Protect } from '@clerk/clerk-react';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import {
  DownloadIcon,
  MoreHorizontal,
  Star,
  StarOff,
  Trash,
  UndoIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { FileType } from '.';

export const CellAction = ({
  file,
  fileType,
  isFavorite
}: {
  file: Doc<'files'>;
  fileType: FileType;
  isFavorite: boolean;
}) => {
  const {
    isConfirmOpen,
    setIsConfirmOpen,
    handleToggleFavorite,
    handleDownload,
    handleDeleteOrRestore,
    me,
    deleteFile
  } = useFileActions(file, fileType);

  const isTrash = fileType === 'TRASH';

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for deletion. Files are deleted
              periodically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                setIsConfirmOpen(false);
                toast('Your file will be deleted soon.');
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="h-6 w-6 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isTrash && (
            <DropdownMenuItem
              onClick={() => handleToggleFavorite(file._id)}
              className="flex cursor-pointer items-center gap-2"
            >
              {isFavorite ? (
                <Star className="h-4 w-4" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
              {isFavorite ? 'Unfavorite' : 'Favorite'}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={handleDownload}
            className="flex cursor-pointer items-center gap-2"
          >
            <DownloadIcon className="h-4 w-4" />
            Download
          </DropdownMenuItem>

          <Protect
            condition={(check) =>
              check({ role: 'org:admin' }) || file.usrId === me?._id
            }
            fallback={<></>}
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDeleteOrRestore}
              className={`flex cursor-pointer items-center gap-2 ${
                file.shouldDelete ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {file.shouldDelete ? (
                <UndoIcon className="h-4 w-4" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
              {file.shouldDelete ? 'Restore' : 'Delete'}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
