import React, {useEffect, useRef, useState} from 'react';
import Content from "./Content";
import themeRepo from "../repository/themeRepo";
import PageFinder from "./util/PageFinder";
import {DirectoryModel} from "../model/ProfileModel";
import {Profile} from "./Profile";
import Button from "react-bootstrap/Button";
import {Directory} from "./Directory";
import TabbedComponent from "./TabbedComponent";
import constitutionComp from "../repository/pages/constitutionComp";
import testImg from "../repository/pages/testImg";


const Viewer = () => {
    const [editable, setEditable] = useState(false);
    const [theme, setTheme] = useState();
    const [themeOptions, setThemeOptions] = useState([]);
    const [showingIdx, setShowingIdx] = useState(0);
    const [pagePerView, setPagePerView] = useState(0);
    const [pages, setPages] = useState([]);
    const [directory, setDirectory] = useState(new DirectoryModel());
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
        viewFunctions["setTheme"] = setTheme;
        viewFunctions["setPages"] = setPages;
        viewFunctions["setShowingIdx"] = setShowingIdx;
    }, []);

    //TODO: 추후 의존성 이동 필요
    useEffect(() => {
        const newUtils = {...viewUtils};
        newUtils["PageFinder"] = <PageFinder pages={pages} viewFunctions={viewFunctions.current}/>;
        newUtils["Profile"] = <Profile functions={viewFunctions} model={directory.profile[0]}/>
        // newUtils["Directory"] = <Directory functions={viewFunctions} model={directory}/>
        newUtils["Tabbed"] = <TabbedComponent functions={viewFunctions} model={directory}>
            <Directory functions={viewFunctions} model={directory} title={"연락처"}/>
            <Content page={constitutionComp} title={"회칙"}/>
        </TabbedComponent>
        setViewUtils(newUtils);
    }, [pages, viewFunctions, directory]);

    useEffect(() => {
        if (theme) {
            const themePagePerView = theme["pagePerView"];
            setPagePerView(themePagePerView);
            document.querySelector('#templateSelect').options[theme.idx].selected = true;
        }
    }, [theme]);

    const handleCheckboxChange = (e) => {
        setEditable(e.target.checked);
    };

    const handleSelectTheme = (e) => {
        setTheme(themeRepo()[e.target.value]);
    };

    const initLoadPages = () => {
        try {
            const jsonData = testImg;
            const pages = jsonData["pages"];
            setPages(pages);
            if (jsonData["defaultTheme"]) {
                setTheme(themeRepo()[jsonData["defaultTheme"]]);
            }
        } catch (error) {
            console.error('Failed to fetch page data:', error);
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (!initLoadPages()) {
            alert("가져올 페이지가 없습니다.");
        }
    }, []);

    useEffect(() => {
        if (pagePerView && pages.length > 0) {
            const tmpContents = [];
            for (let i = showingIdx; i < pagePerView && i < pages.length; i++) {
                tmpContents.push(<Content key={i} editable={editable} page={pages[i]}/>);
            }
            setViewContents(tmpContents);
        } else {
            setViewContents([]);
        }
    }, [showingIdx, pagePerView, pages, editable]);

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
            <input type="checkbox" name="editable" id="editchkbox" onChange={handleCheckboxChange}/>
            <label htmlFor="editchkbox">Editable</label>
            <select id="templateSelect" onChange={handleSelectTheme}>
                {themeOptions}
            </select>
            <label htmlFor="templateSelect">template</label>
            <Button variant="primary" onClick={() => viewFunctions["modalShow"](true)}>
                프로필 보기
            </Button>
            {viewContents.length > 0 &&
                <ThemeComponent contents={viewContents} functions={viewFunctions.current} utils={viewUtils}/>}
            {/*{editable && <EditToolbox />}*/}
        </div>
    );
};

export default Viewer;
