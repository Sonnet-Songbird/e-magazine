import {ContextURL} from "../config";
import {GlassMagnifier} from "@niklasmaki/react-image-magnifiers";
import React from "react";

//컨텐츠 탬플릿

export function ImageContent(folderName, fileName, idx, alt) {
    const src = `${ContextURL.ROOT}/${folderName}/${fileName}`;
    const altText = alt || (idx !== undefined ? `${idx}번 이미지` : fileName);

    return (
        // <Magnifier
        //     key={fileName}
        //     className={"magnifiedImg"}
        //     imageSrc={src}
        //     imageAlt={altText}
        // />
        // <img
        //     key={fileName}
        //     className={"image"}
        //     alt={altText}
        //     src={src}
        // />
        <GlassMagnifier
            key={fileName}
            className="magnifiedImg"
            imageSrc={src}
            alt={altText}
            allowOverflow={false}
            magnifierSize={300}
            magnifierOffsetX={0}
            magnifierOffsetY={0}
            square={true}
        />
    );
};

//Todo: Not tested
export function AlbumContent(folderName, count, ext, startIdx = 1) {
    return Array.from({length: count}, (_, i) => {
        const fileName = `${startIdx + i}.${ext}`;
        const alt = `${folderName}/${fileName}`;
        return (
            ImageContent(folderName, fileName, startIdx + i, alt)
        );
    });
};

export function HtmlContent(innerHtml) {
    return (<div className="content-html"
                 dangerouslySetInnerHTML={{__html: innerHtml}}>
    </div>)
}

export function HtmlDynamicContent(innerHtml) {
    //pagenation까지 포함한 하나의 컴포넌트로 만들던가, height를 입력하면 컴포넌트 배열을 돌려주는 html을 가진 객체로 만들던가
}
