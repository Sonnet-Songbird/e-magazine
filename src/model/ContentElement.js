import {ContextURL} from "../config";
import {GlassMagnifier} from "@niklasmaki/react-image-magnifiers";
import React from "react";

export function ImageContent({folderName, fileName, idx, alt}) {
    const src = `${ContextURL.ROOT}/${folderName}/${fileName}`;
    const altText = alt || (idx !== undefined ? `${idx}번 이미지` : fileName);

    return (
        <GlassMagnifier
            className="magnifiedImg"
            imageSrc={src}
            alt={altText}
            allowOverflow={false}
            magnifierOffsetX={0}
            magnifierOffsetY={0}
            square={true}
        />
    );
};

export function AlbumContent(folderName, count, ext, startIdx = 1) {
    return Array.from({length: count}, (_, i) => {
        const fileName = `${startIdx + i}.${ext}`;
        return (
            <ImageContent
                key={i}
                folderName={folderName}
                fileName={fileName}
                idx={startIdx + i}
            />
        );
    });
};

