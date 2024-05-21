//@Component: profile, contact(list)

export class ProfileModel {
    //@arg: contact: [string]
    constructor(belong, name, contact, note, keyword) {
        this.belong = belong ? belong : "";
        this.name = name ? name : "";
        this.contact = contact ? contact : [""];
        this.note = note ? note : [""];
        this.keyword = keyword ? keyword : [""];
    }
}
