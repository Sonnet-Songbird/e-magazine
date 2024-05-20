import React from "react";

export default class ContentModel {
    constructor(htmlString = "", setState, datasets = {}) {
        this.child = [];
        this.setState = setState;
        this.datasets = datasets;
        if (htmlString) {
            this.parseHTML(htmlString);
        }
    }

    parseHTML(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        this.child = Array.from(doc.body.children).map(el => this.convertElementToModel(el));
    }

    convertElementToModel(element) {
        const tagName = element.tagName.toLowerCase();
        const style = element.style ? element.style.cssText : "";
        const content = element.innerHTML;
        return new ContentElement(tagName, style, content);
    }

    addSpan(index, text) {
        if (index < 0 || index >= this.child.length) return;
        const span = document.createElement("span");
        span.textContent = this.sanitizeText(text);
        this.child[index].content += span.outerHTML;
    }

    sanitizeText(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    render(datasetName = null) {
        let datasetElements = null;
        if (datasetName && this.datasets[datasetName]) {
            datasetElements = this.datasets[datasetName].map((data, index) => (
                <p key={index}>{this.sanitizeText(data)}</p>
            ));
        }

        return (
            <article>
                {this.child.map((element, index) => (
                    <React.Fragment key={index}>
                        {element.renderElement()}
                    </React.Fragment>
                ))}
                {datasetElements}
            </article>
        );
    }
}

class ContentElement {
    constructor(tag, style, content) {
        this.tag = tag;
        this.style = style;
        this.content = content;
    }

    renderElement() {
        const Element = this.tag;
        const styleObj = this.style ? {style: this.style} : {};
        return (
            <Element {...styleObj} dangerouslySetInnerHTML={{__html: this.content}}></Element>
        );
    }
}
