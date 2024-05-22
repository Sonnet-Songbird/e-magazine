import themeRepo from "../repository/themeRepo";
import constitution from "../repository/pages/constitution";

export class ContentModel {
    constructor(setPages, setTheme) {
        this.setPages = setPages;
        this.setTheme = setTheme;
        this.child = [];
        this.datasets = [];
    }

    fetchPages() {
        try {
            const jsonData = constitution;
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
}
