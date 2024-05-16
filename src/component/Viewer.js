import React, { useEffect, useRef, useState } from 'react';
import Content from "./Content";
import themeRepo from "../repository/themeRepo";
import contentFetcher from "../class/ContentFetcher";
import EditToolbox from "./EditToolbox";
import PageFinder from "./util/PageFinder";

const Viewer = () => {
    const [editable, setEditable] = useState(false);
    const [theme, setTheme] = useState();
    const [themeOptions, setThemeOptions] = useState([]);
    const [showingidx, setShowingidx] = useState(0);
    const [pagePerView, setPagePerView] = useState(0);
    const [pages, setPages] = useState([]);
    const [viewContents, setViewContents] = useState([]);
    const [viewUtils, setViewUtils] = useState({});
    const viewFunctions = useRef({});

    const initThemeOption = () => {
        const options = Object.keys(themeRepo()).map(name => {
            return (
                <option key={name} value={name}>{name}</option>
            );
        });
        setThemeOptions(options);
    }

    useEffect(() => {
        initThemeOption();
    }, []);

    useEffect(() => {
        const newUtils = { ...viewUtils };
        console.log(viewFunctions.current["goTo"])
        newUtils["PageFinder"] = <PageFinder pages={pages} viewFunctions={viewFunctions.current} />;
        setViewUtils(newUtils);
    }, [pages, viewFunctions]);

    useEffect(() => {
        if (theme) {
            const themePagePerView = theme["pagePerView"];
            setPagePerView(themePagePerView);
            document.querySelector('#templateselect').options[theme.idx].selected = true;
        }
    }, [theme]);

    const handleCheckboxChange = (e) => {
        setEditable(e.target.checked);
    };

    const handleSelectTheme = (e) => {
        setTheme(themeRepo()[e.target.value]);
    };

    const initloadPages = () => {
        const pagePatcher = new contentFetcher(setPages, setTheme, "testImg");
        return pagePatcher.fetchPages();
    }

    useEffect(() => {
        if (!initloadPages()) {
            alert("가져올 페이지가 없습니다.");
        }
    }, []);

    useEffect(() => {
        if (pagePerView && pages.length > 0) {
            const tmpContents = [];
            for (let i = showingidx; i < pagePerView && i < pages.length; i++) {
                tmpContents.push(<Content key={i} editable={editable} page={pages[i]} />);
            }
            setViewContents(tmpContents);
        } else {
            setViewContents([]);
        }
    }, [showingidx, pagePerView, pages, editable]);

    const ThemeComponent = (props) => {
        if (!theme) {
            return null;
        }
        const component = theme["component"];
        if (component) {
            return component(props);
        } else {
            return null;
        }
    };

    return (
        <div>
            <input type="checkbox" name="editable" id="editchkbox" onChange={handleCheckboxChange} />
            <label htmlFor="editchkbox">Editable</label>
            <select id='templateselect' onChange={handleSelectTheme}>
                {themeOptions}
            </select>
            <label htmlFor="templateselect">template</label>
            {viewContents.length > 0 &&
                <ThemeComponent contents={viewContents} functions={viewFunctions.current} utils={viewUtils} />}
            {editable && <EditToolbox />}
        </div>
    );
};

export default Viewer;
