//@Component: profile, contact(list)
import React from "react";

export class DirectoryModel {
    constructor() {
        this.profiles = []
        this.header = (
            <thead>
                <tr className={"profile-tableHeader-tr"}>
                    <th className={"profile-tableHeader-th"}>소속</th>
                    <th className={"profile-tableHeader-th"}>성명</th>
                    <th className={"profile-tableHeader-th"}>연락처</th>
                    <th className={"profile-tableHeader-th"}>메일</th>
                    <th className={"profile-tableHeader-th"}>메모</th>
                </tr>
            </thead>)
    }

    static createMock() {
        const model = new DirectoryModel();
        for (let i = 0; i < 100; i = i + 2) {
            model.profiles.push(new ProfileModel("41기", `김재희${i}`, "010-2667-5772", "lfds9ff0@naver.com", "7반", i));
            model.profiles.push(new ProfileModel("41기", `김재희${i + 1}`, "010-2667-5772", "toj@t2l.co.kr", "7반", i + 1));
        }
        model.profiles.push(new ProfileModel("41기", "김재희", "010-2667-5772", "toj@t2l.co.kr", "7반", 44))
        return model;
    }

    findByName(name) {
        const list = [];
        console.log(name)
        this.profiles.forEach((profile) => {
            if (profile.name === name) {
                list.push(profile)
            }
        })
        return list;
    }
}

class ProfileModel {
    //@arg: contact: [string], note: [string], keyword[string]
    constructor(belong, name, contact, mail, note, index) {
        this.belong = belong ? belong : "";
        this.name = name ? name : "";
        this.contact = contact ? contact : [""];
        this.mail = mail ? mail : [""];
        this.note = note ? note : [""];
        this.index = index ? index : [""];
        this.key = window.crypto.randomUUID();
    }

    getTableRow(onClickFnc) {
        return (
            <tr className={"profile-tableBody-tr"} data-index={this.index} key={`${this.key}`} onClick={() => onClickFnc(this.index)}>
                <td className={"profile-tableBody-td"}>{this.belong}</td>
                <td className={"profile-tableBody-td"}>{this.name}</td>
                <td className={"profile-tableBody-td"}>{this.contact}</td>
                <td className={"profile-tableBody-td"}>{this.mail}</td>
                <td className={"profile-tableBody-td"}>{this.note}</td>
            </tr>
        )
    }
}

