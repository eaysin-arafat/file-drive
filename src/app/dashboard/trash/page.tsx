"use client";

import React from "react";
import FileBrowser from "@/components/core/file-browser";

export default function Trash() {
  return (
    <div>
      <FileBrowser title={"Trash File"} deletedOnly />
    </div>
  );
}
