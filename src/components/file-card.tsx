"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { getFileUrl } from "@/utility/get-file-url";
import { FileCardActions } from "@/components/file-card-action";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "date-fns";

export const FileCard = ({
  file,
}: {
  file: Doc<"files"> & { isFvaorited: boolean };
}) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.usrId,
  });

  const typesIcons = {
    image: <ImageIcon />,
    pdf: <ImageIcon />,
    csv: <ImageIcon />,
  } as Record<Doc<"files">["type"], React.ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <p>{typesIcons[file.type]}</p> {file.name}
        </CardTitle>
        <div className="absolute top-[19px] right-2">
          <FileCardActions isFavorited={file.isFvaorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[100px] flex justify-center items-center">
        {file.type === "image" && (
          <Image
            src={getFileUrl(file.fileId)}
            alt={file.name}
            width="200"
            height="100"
          />
        )}

        {file.type === "csv" && <ImageIcon className="w-20 h-20" />}
        {file.type === "pdf" && <ImageIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex justify-between gap-2 text-xs">
        <div className="flex gap-1 items-center text-gray-800">
          <Avatar className="w-6 h-6 text-xs">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>{userProfile?.name}</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>

        <p className="text-xs text-gray-600">
          Uplodad on {formatRelative(new Date(file._creationTime), new Date())}
        </p>
      </CardFooter>
    </Card>
  );
};
