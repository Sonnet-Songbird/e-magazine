
const ContentType = {
    // ENUM
    IMG: {
        tag: "Img", //One Page Image
        //@Component:GlassMagnifier
        handle(content) {
        }
    }
    , ALBUM: {
        tag: "Album",//Image Array
        //@Component:[GlassMagnifier]
        handle(content) {
        }
    }
    , HTML: { //Static Paging HTML
        tag: "Html",
        //@Component:div
        handle(content) {
        }
    }, DYNAMIC: { //Dynamic Paging HTML
        tag: "Html/D",
        //@Component:[div]
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
        throw new Error(`No such tag`);
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
