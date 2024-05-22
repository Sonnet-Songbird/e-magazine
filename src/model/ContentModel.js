import React from "react";
import themeRepo from "../repository/themeRepo";
import {GlassMagnifier} from "@niklasmaki/react-image-magnifiers";
import constitution from "../repository/pages/constitution";
import {ContextURL} from "../config";


export class contentFetcher {
    constructor(setPages, setTheme) {
        this.setPages = setPages;
        this.setTheme = setTheme;
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

    fetchPageData() {
        try {
            return require(`../repository/pages/${this.jsonName}.json`);
        } catch (error) {
            throw new Error('Failed to fetch page data');
        }
    }
}



export class ContentModel {
    constructor(htmlString = "", setState, datasets = {}) {
        this.child = [];
        this.setState = setState;
        this.datasets = datasets;
        if (htmlString) {
            this.parseHTML(htmlString);
        }
    }
}
