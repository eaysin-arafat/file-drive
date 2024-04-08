"use client";

import React from "react";
import FileBrowser from "@/components/core/file-browser";

export default function Favourites() {
  return (
    <div>
      <FileBrowser title={"Your Favourite"} favoriteOnly={true} />
    </div>
  );
}
