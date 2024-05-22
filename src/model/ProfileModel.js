//@Component: profile, contact(list)
export class DirectoryModel {
    constructor() {
        this.profile = this.fetchProfiles()
    }

    fetchProfiles() {
        let directory = []
        try {
            const directoryRepo = directory.profiles
            directoryRepo.forEach((item) => {
                const i = item.profile
                directory.push(new ProfileModel(
                    i.belong
                    , i.name
                    , i.contact
                    , i.keyword
                    , i.note
                ))
            })

        } catch (error) {
            console.error('Failed to fetch profile data:', error);
        }
        return directory;
    }
}

export class ProfileModel {
    //@arg: contact: [string], note: [string], keyword[string]
    constructor(belong, name, contact, note, keyword) {
        this.belong = belong ? belong : "";
        this.name = name ? name : "";
        this.contact = contact ? contact : [""];
        this.note = note ? note : [""];
        this.keyword = keyword ? keyword : [""];
    }
}

