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

export const FileCard = ({
  file,
  favorites,
}: {
  file: Doc<"files">;
  favorites: Doc<"favourite">[];
}) => {
  const typesIcons = {
    image: <ImageIcon />,
    pdf: <ImageIcon />,
    csv: <ImageIcon />,
  } as Record<Doc<"files">["type"], React.ReactNode>;

  const isFavorited = favorites.some(
    (favourite) => favourite.fileId === file._id
  );

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          <p>{typesIcons[file.type]}</p> {file.name}
        </CardTitle>
        <div className="absolute top-[19px] right-2">
          <FileCardActions isFavorited={isFavorited} file={file} />
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
      <CardFooter className="flex justify-center">
        <Button onClick={() => window.open(getFileUrl(file.fileId), "_blank")}>
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};
