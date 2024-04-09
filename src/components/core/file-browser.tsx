"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";
import { GridIcon, Loader2, RowsIcon, TableIcon } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import PlaceholderState from "@/components/placeholder-state";
import { UploadButton } from "@/components/upload-button";
import { FileCard } from "@/components/file-card";
import { api } from "../../../convex/_generated/api";
import { DataTable } from "./file-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FileBrowser({
  title,
  favoriteOnly,
  deletedOnly,
}: {
  title: string;
  favoriteOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const { organization, isLoaded } = useOrganization();
  const user = useUser();
  const [query, setQuery] = React.useState("");

  let orgId: string | undefined = undefined;
  if (isLoaded && user.isLoaded) {
    orgId = organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites: favoriteOnly, deletedOnly } : "skip"
  );

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFvaorited: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];

  const isLoading = files === undefined;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <SearchBar query={query} setQuery={setQuery} />
        <UploadButton />
      </div>

      <Tabs defaultValue="grid">
        <TabsList className="mb-4">
          <TabsTrigger value="grid" className="flex gap-2 items-center">
            <GridIcon /> Grid
          </TabsTrigger>
          <TabsTrigger value="table" className="flex gap-2 items-center">
            <RowsIcon /> Table
          </TabsTrigger>
        </TabsList>

        {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <p className="text-2xl font-medium">Loading your documents...</p>
          </div>
        )}

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modifiedFiles?.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="table">
          <DataTable columns={columns} data={modifiedFiles} />
        </TabsContent>
      </Tabs>

      {files?.length === 0 && <PlaceholderState />}
    </div>
  );
}
