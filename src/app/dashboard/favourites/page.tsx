
"use client";

import React from "react";
import FileBrowser from "@/components/core/file-browser";
import {useQuery} from "convex/react";

export default function Favourites() {
    const files = useQuery()
    return (
        <div>
            <FileBrowser title={"Your Favourite"}/>
        </div>
    );
}
