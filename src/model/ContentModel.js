import themeRepo from "../repository/themeRepo";
import constitution from "../repository/pages/constitution";
import testImg from "../repository/pages/testImg";

export class ContentModel {
    constructor(setPages, setTheme) {
        this.setPages = setPages;
        this.setTheme = setTheme;
        this.elements = [];
    }

    fetchPages() {
        try {
            const jsonData = testImg;
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
