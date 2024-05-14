import themeRepo from "../repository/themeRepo";

class contentFetcher {
    constructor(setPages, setTheme, jsonName) {
        this.setPages = setPages;
        this.setTheme = setTheme;
        this.jsonName = jsonName;
    }

    fetchPages() {
        try {
            const jsonData = this.fetchPageData();
            const pages = jsonData["pages"];
            this.setPages(pages);
            if (!jsonData["defaultTheme"]) {
                return;
            }
            this.setTheme(themeRepo()[jsonData["defaultTheme"]]);

        } catch (error) {
            console.error('Failed to fetch page data:', error);
            return false;
        }
        return true;
    }

    fetchPageData() {
        try {
            return require(`../repository/pages/${this.jsonName}.json`);
        } catch (error) {
            throw new Error('Failed to fetch page data');
        }
    }
}

export default contentFetcher;
