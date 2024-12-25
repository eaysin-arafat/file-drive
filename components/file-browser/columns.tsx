'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { ColumnDef } from '@tanstack/react-table';
import { formatRelative } from 'date-fns';
import { FileType } from '.';
import { Badge } from '../ui/badge';
import { CellAction } from './call-actions';
import UserCell from './user-cell';

type ColumnType = ColumnDef<Doc<'files'> & { isFavorite: boolean }>[];

export const columns = (fileType: FileType): ColumnType => {
  return [
    {
      accessorKey: 'name',
      header: 'NAME'
    },
    {
      header: 'Type',
      cell: ({ row }) => {
        return <Badge>{row?.original?.type}</Badge>;
      }
    },
    {
      header: 'User',
      cell: ({ row }) => {
        return <UserCell userId={row?.original?.usrId} />;
      }
    },
    {
      header: 'Uploaded On',
      cell: ({ row }) =>
        formatRelative(new Date(row?.original?._creationTime), new Date())
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          fileType={fileType}
          file={row.original}
          isFavorite={row?.original?.isFavorite}
        />
      )
    }
  ];
};
