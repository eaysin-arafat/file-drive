"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FileCardActions } from "../file-card-action";

const UserCell = ({ userId }: { userId: Id<"users"> }) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: userId,
  });

  return (
    <div className="flex gap-2 text-xs items-center text-gray-800">
      <Avatar className="w-6 h-6">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>{userProfile?.name}</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
};

export const columns: ColumnDef<Doc<"files"> & { isFvaorited: boolean }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "User",
    cell: ({ row }) => {
      return <UserCell userId={row?.original?.usrId} />;
    },
  },
  {
    header: "Uploaded On",
    cell: ({ row }) => {
      return (
        <div>
          {formatRelative(new Date(row?.original?._creationTime), new Date())}
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          <FileCardActions
            file={row.original}
            isFavorited={row.original.isFvaorited}
          />
        </div>
      );
    },
  },
];

const Columns = () => {
  return <div>Columns</div>;
};

export default Columns;
