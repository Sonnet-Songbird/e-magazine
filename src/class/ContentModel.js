// 미사용

class ContentModel {
    constructor(child = []) {
        this.child = child
    }

    render() {
        const element = document.createElement("div");
        if (this.style) {
            Object.assign(element.style, this.style);
        }
        if (this.textContent) {
            element.textContent = this.textContent;
        }
        return element;
    }

    makeSpan() {

    }
}

class Paragraph {
    constructor(style, content, tag = "p") {
        this.style = style;
        this.content = style;
        this.tag = tag;
    }

    render() {
        const element = document.createElement(this.tag)
        if (this.style) {
            Object.assign(element.style, this.style);
        }
        if (this.textContent) {
            element.textContent = this.textContent;
        }
    }


}
