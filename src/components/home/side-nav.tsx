"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {FileIcon, StarIcon} from "lucide-react";
import React from "react";
import {usePathname} from "next/navigation";

const SideNav = () => {
    const pathname = usePathname()

    return <div className="w-48 flex-col gap-4">
        <Link href={"/dashboard/files"}>
            <Button
                variant={"link"}
                className={`flex gap-2 ${pathname.includes("/dashboard/files") && "text-blue-500"}`}>
                <FileIcon/> All Files
            </Button>
        </Link>

        <Link href={"/dashboard/favourites"}>
            <Button variant={"link"}  className={`flex gap-2 ${pathname.includes("/dashboard/favourites") && "text-blue-500"}`}>
                    <StarIcon/> Favorites
            </Button>
        </Link>
    </div>
}

export default SideNav;