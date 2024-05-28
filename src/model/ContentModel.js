//index와 Theme에 대한 Facade를 겸함
import {isMobile} from "react-device-detect";

export class ContentModel {
    constructor() {
        this.contents = [] // [component]
        this.index = []; // [indexModel]
        this.theme = null;
        this.mobileTheme = null;
    }

    /*
    * @arg: ContentModel
    * */
    concat(target, isTargetAfter = true) {
        let copy = JSON.parse(JSON.stringify(this));
        if (isTargetAfter) {
            copy.contents = copy.contents.concat(target.contents);
        } else {
            copy.contents = target.contents.concat(copy.contents);
        }

        return copy;
    }

    getTheme() {

        if (isMobile && this.mobileTheme) {
            return this.mobileTheme;
        }
        return this.theme
    }

    stringfy() {
        return JSON.stringify(this);
    }

    // static fetchData(contentKey) {
    //     return this.parse(someFunc[contentKey])
    // }

    static parse(string) {
        return JSON.parse(string)
    }

    //@arg: Component || [Components]
    add(component) {
        if (Array.isArray(component)) {
            component.forEach(component => {
                this.contents.push(component);
            });
        } else {
            this.contents.push(component);
        }
    }

    find(idxName, keyword) {
        const find = this.index[idxName].find
        if (!find) {
            return [];
        }
        return find(keyword);
    }

    //@arg: key: keyword || [keywords]
    addIndex(name, number, key) {
        const model = this.index[name] || (this.index[name] = new IndexModel());
        model.keyIndex[number] = key;
    }

    linkIndex(indexModel) {
        this.index.push(indexModel)
    }
}


class IndexModel {
    constructor() {
        this.keyIndex = {};
    }

    find(keyword) {
        console.log(this.keyIndex);
        keyword = keyword.toLowerCase();
        const results = [];
        for (const [number, value] of Object.entries(this.keyIndex)) {
            if (this._isIncludes(value, keyword)) {
                results.push({number, keyword: value});
            }
        }
        console.log(results);
        return results;
    }

    _isIncludes(value, keyword) {
        return value.toLowerCase().includes(keyword);
    }


    //overloading facade
    add(number, key) {
        if (Array.isArray(key)) {
            this.addKeyWords(number, key)
        }
        this.addKeyword(number, key)
    }

    addKeyWords(number, keywords) {
        keywords.forEach(keyword => {
            this.addKeyword(number, keyword.toLowerCase());
        });
    }

    addKeyword(number, keyword) {
        if (this.keyIndex[keyword]) {
            this.keyIndex[keyword].push(number);
        } else {
            this.keyIndex[keyword] = [number];
        }
    }


}

