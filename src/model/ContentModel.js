import React from "react";
import themeRepo from "../repository/themeRepo";
import {GlassMagnifier} from "@niklasmaki/react-image-magnifiers";

import {ContextURL} from "../config";



export class contentFetcher {
    constructor(setPages, setTheme, jsonName) {
        this.setPages = setPages;
        this.setTheme = setTheme;
        this.jsonName = jsonName;
    }

    fetchPages() {
        try {
            const jsonData = this.fetchPageData();
            const pages = jsonData["pages"];
            this.setPages(pages);
            if (!jsonData["defaultTheme"]) {
                return;
            }
            this.setTheme(themeRepo()[jsonData["defaultTheme"]]);

        } catch (error) {
            console.error('Failed to fetch page data:', error);
            return false;
        }
        return true;
    }

    fetchPageData() {
        try {
            return require(`../repository/pages/${this.jsonName}.json`);
        } catch (error) {
            throw new Error('Failed to fetch page data');
        }
    }
}

const ContentType = {

    // ENUM
    IMG: {
        tag: "Img",
        handle(content) {
        }
    }
    , ALBUM: {
        tag: "Album",
        handle(content) {
        }
    }
    , HTML: {
        tag: "Html",
        handle(content) {
        }
    }

    // Function
    , getByTag(tag) {
        for (let key in this) {
            if (this[key].tag === tag) {
                return this[key];
            }
        }
        return null;
    }
    , popTag(content) {
        const tagPattern = /^#(\w+);/;
        if (content[0] !== "#") {
            throw new Error(`Content must start with content type tag `);
        }
        const match = content.match(tagPattern);
        if (match) {
            const handler = this.getByTag(match[1]);
            return {
                handler: handler,
                content: content.replace(tagPattern, '')
            };
        }
        return {
            handler: null,
            content: content
        };
    }
    , putTag(type, content) {
        const typeTag = type.toUpperCase();
        if (this.tags[typeTag]) {
            return `#${this.tags[typeTag].tag};${content}`;
        } else {
            throw new Error(`Invalid Type: "${typeTag}"not found in ContentType.`);
        }
    }
    , handleContent(content) {
        const {handler, content: strippedContent} = this.popTag(content);

        if (!handler) {
            console.error("Invalid content format or unknown content type.");
            return;
        }

        handler.handle(strippedContent);
    }
};


class ImageContent {
    constructor(folderName, fileName, idx, alt = `${idx}번 이미지`) {
        this.folderName = folderName;
        this.fileName = fileName;
        this.idx = idx;
        this.alt = alt;
        this.src = `${ContextURL.ROOT}/${this.folderName}/${this.fileName}`
    }

    render() {
        return (
            <GlassMagnifier
                className="magnifiedImg"
                imageSrc={this.src}
                allowOverflow="false"
                magnifierOffsetX="0"
                magnifierOffsetY="0"
                square="true"
            />
        );
    }


    //파일명은 1에서부터 유효 숫자만
    // @return [Component]
    static albumContent(folderName, count, ext, startIdx) {
        const album = []
        for (let i = 0; i < count; i++) {
            album.push(new ImageContent(folderName, `${count + 1}.${ext}`, startIdx + i).render())
        }
        return album
    }
}


export class ContentModel {
    constructor(htmlString = "", setState, datasets = {}) {
        this.child = [];
        this.setState = setState;
        this.datasets = datasets;
        if (htmlString) {
            this.parseHTML(htmlString);
        }
    }
}
