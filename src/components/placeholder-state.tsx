import Image from "next/image";
import {UploadButton} from "@/components/upload-button";
import React from "react";

 const PlaceholderState = () => {
    return<div className="flex flex-col items-center mt-24 gap-8">
                <Image
                    src="/empty.svg"
                    height="300"
                    width="300"
                    alt="an image of a picture and directory icon"
                />
                <p className="text-2xl font-medium">
                    You have no files, upload one now
                </p>
                <UploadButton />
            </div>
}

export  default  PlaceholderState