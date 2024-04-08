"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";
import { Loader2 } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import PlaceholderState from "@/components/placeholder-state";
import { UploadButton } from "@/components/upload-button";
import { FileCard } from "@/components/file-card";
import { api } from "../../../convex/_generated/api";

export default function FileBrowser({
  title,
  favoriteOnly,
}: {
  title: string;
  favoriteOnly: boolean;
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
    orgId ? { orgId, query, favorites: favoriteOnly } : "skip"
  );

  const isLoading = files === undefined;

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
          <p className="text-2xl font-medium">Loading your documents...</p>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <UploadButton />
          </div>

          {files?.length === 0 && <PlaceholderState />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files?.map((file) => (
              <FileCard
                favorites={favorites ?? []}
                key={file._id}
                file={file}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
