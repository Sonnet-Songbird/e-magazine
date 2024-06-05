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

    mergeContent(targetIdx, source) {
        const current = this.contents[targetIdx]
        this.contents[targetIdx] = (<>
            {current}
            {source}
        </>)
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

    //@arg: name: string, data: obj{number: [keyword]}
    addIndexData(name, data) {
        const model = this.index[name] || (this.index[name] = new IndexModel());
        model.addDataObj(data)
    }

    linkIndex(indexModel) {
        this.index.push(indexModel)
    }

    setIsInclude(name, bool) {
        if (this.index[name]) {
            this.index[name].isInclude = bool;
            return;
        }
        console.error(`${name}에 해당하는 인덱스가 없습니다.`);
    }
}


class IndexModel {
    constructor() {
        this.keyIndex = {};
        this.isInclude = true;
    }

    find(keyword) {
        keyword = keyword.toLowerCase();
        const results = [];
        for (const [key, values] of Object.entries(this.keyIndex)) {
            for (const value of values) {
                if (this.isHit(value, keyword)) {
                    results.push({idx: key, keyword: value});
                }
            }
        }
        return results;
    }

    isHit(value, keyword) {
        if (this.isInclude) {
            return value.toLowerCase().includes(keyword);
        } else {
            return value.toLowerCase() === keyword.toLowerCase();
        }
    }

//@arg: number, key || [key]
    add(number, key) {
        if (Array.isArray(key)) {
            this.addKeyWords(number, key)
            return;
        }
        this.addKeyword(number, key)
    }

    addKeyWords(number, keywords) {
        keywords.forEach(keyword => {
            this.addKeyword(number, keyword.toLowerCase());
        });
    }

    addKeyword(number, keyword) {
        if (this.keyIndex[number]) {
            this.keyIndex[number].push(keyword);
        } else {
            this.keyIndex[number] = [keyword];
        }
    }

    addDataObj(data) {
        Object.keys(data).forEach(number => {
            data[number].forEach(name => {
                this.addKeyword(number, name);
            });
        });
    }
}

