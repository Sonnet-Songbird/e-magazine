import {ContextURL} from "../config";
import {GlassMagnifier} from "@niklasmaki/react-image-magnifiers";
import React from "react";
import {isMobile} from "react-device-detect";

//컨텐츠 탬플릿

export function ImageContent(folderName, fileName, idx, alt) {
    const src = `${ContextURL.ROOT}${folderName}/${fileName}`;
    const altText = alt || (idx !== undefined ? `${idx}번 이미지` : fileName);

    if (isMobile) {
        return (<img
            key={fileName}
            className={"Img"}
            alt={altText}
            src={src}
        />)
    }
    return (
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
}

//Todo: Not tested
export function AlbumContent(folderName, count, ext, startIdx = 1, withCover = true) {
    const images = [];

    if (withCover) {
        images.push(ImageContent(folderName, "fCover.jpg", images.length, `${folderName}/fCover.jpg`));
        images.push(whitePage(images.length));
    }

    for (let i = 0; i < count; i++) {
        const fileName = `${startIdx + i}.${ext}`;
        images.push(ImageContent(folderName, fileName, images.length, `${folderName}/${fileName}`));
    }

    if (withCover) {
        if (count % 2 === 1) {
            images.push(whitePage(images.length))
        }
        images.push(ImageContent(folderName, "bCover.jpg", startIdx + count + 1, `${folderName}/bCover.jpg`));
    }
    return images;
}


export function HtmlContent(innerHtml) {
    return (<div className="content-html"
                 dangerouslySetInnerHTML={{__html: innerHtml}}>
    </div>)
}

export function HtmlDynamicContent(innerHtml) {
    //pagenation까지 포함한 하나의 컴포넌트로 만들던가, height를 입력하면 컴포넌트 배열을 돌려주는 html을 가진 객체로 만들던가
}


const whitePage = (idx) => {
    return ImageContent("pics", "whitePage.jpg", idx, `White Page`)
}
