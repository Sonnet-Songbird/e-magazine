import contentRepo from "../repository/ContentRepo";
import themeRepo from "../repository/themeRepo";
import testImg from "../repository/pages/testImg";

export class ContentModel {
    constructor() {
        this.contents = [] // component
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


    stringfy() {
        return JSON.stringify(this);
    }

    static parse(string) {
        return JSON.parse(string);
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
}
