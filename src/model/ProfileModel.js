//@Component: profile, contact(list)
import Directory from "../repository/Profile/directory";
export class DirectoryModel {
    constructor() {
        this.profile = this.fetchProfiles()
        console.log("this.profile", this.profile)
    }

    fetchProfiles() {
        let directory = []
        try {
            const directoryRepo = Directory.profiles
            const arr = Array.from(Object.values(directoryRepo));
            arr.forEach((item) => {
                const i = item.profile;
                directory.push(new ProfileModel(
                    i.belong,
                    i.name,
                    i.contact,
                    i.keyword,
                    i.note
                ));
            });

        } catch (error) {
            console.error('Failed to fetch profile data:', error);
        }
        return directory;
    }
}

class ProfileModel {
    //@arg: contact: [string], note: [string], keyword[string]
    constructor(belong, name, contact, note, keyword) {
        this.belong = belong ? belong : "";
        this.name = name ? name : "";
        this.contact = contact ? contact : [""];
        this.note = note ? note : [""];
        this.keyword = keyword ? keyword : [""];
    }
}

