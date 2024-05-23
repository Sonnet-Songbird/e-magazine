import themeRepo from "../repository/themeRepo";
import contentRepo from "../repository/ContentRepo";

export class ContentModel {
    constructor(setContent, setTheme) {
        this.setContent = setContent;
        this.setTheme = setTheme;
    }

    fetchPages(contentKey) {
        try {
            const jsonData = contentRepo(contentKey);
            const pages = jsonData["pages"];
            this.setContent(pages);
            if (jsonData["defaultTheme"]) {
                this.setTheme(themeRepo()[jsonData["defaultTheme"]]);
            }
        } catch (error) {
            console.error('Failed to fetch page data:', error);
            return false;
        }
        return true;
    }
}
