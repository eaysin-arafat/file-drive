"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ImageIcon, MoreVertical, TrashIcon, TypeIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import {fileTypes} from "../../convex/schema";

export const FileCardActions = ({ file }: { file: Doc<"files"> }) => {
  const deleteFile = useMutation(api.files.deleteFile);
  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({
                  fileId: file._id,
                });
                toast({
                  variant: "default",
                  title: "File Deleted",
                  description: "Your file is deleted now",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)}
            className="flex items-center gap-1 text-red-700 cursor-pointer"
          >
            <TrashIcon className="w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const getFileUrl = (fileId: Id<"_storage">) => {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
};
export const FileCard = ({ file }: { file: Doc<"files"> }) => {
  const typesIcons = {
    image: <ImageIcon />,
    pdf: <ImageIcon />,
    csv: <ImageIcon />,
  } as Record<Doc<"files">["type"], React.ReactNode>;
  console.log("getFileUrl(file.fileId)", getFileUrl(file.fileId));
  console.log("file.type", file.type);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          <p>{typesIcons[file.type]}</p> {file.name}
        </CardTitle>
        <div className="absolute top-[19px] right-2">
          <FileCardActions file={file} />
        </div>
        {/* <CardDescriptioTailwind CSS Autocompleten>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
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
        <Button onClick={() => window.open(getFileUrl(file.fileId), "_blank")}>Download</Button>
      </CardFooter>
    </Card>
  );
};
