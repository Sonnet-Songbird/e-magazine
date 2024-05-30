import './AlbumMobile.css';
import React, {useEffect, useState} from "react";
import {Directory} from "../../component/fragment/Directory";
import {DirectoryModel} from "../../model/ProfileModel";
import PageFinder from "../../component/fragment/PageFinder";
import OffCanvasExample from "../../component/fragment/MobileOffcanvas";
import TabbedComponent from "../../component/fragment/TabbedComponent";
import CarouselComp from "../../component/fragment/CarouselComp";
import PageController from "../../component/fragment/PageController";

const AlbumMobile = ({contentModel}) => {
    const contents = () => {
        return contentModel.contents;
    };

    const length = () => {
        return contentModel.contents.length;
    };

    const [active, goTo] = useState(0);

    function movePage(number) {
        const target = (active + number) % length();
        const adjustedTarget = target < 0 ? length() + target : target;
        goTo(adjustedTarget);
    }


    useEffect(() => {
        import('./AlbumMobile.css');
    }, []);


    const renderPages = () => {
        return contents().map((frontContent, idx) => (
            <div className="item" key={idx} id={`p${idx + 1}`}>
                {frontContent !== undefined && frontContent}
            </div>
        ));
    };

    return (
        <div className={"album-mobile"}>
            <OffCanvasExample name={" "}>
                <TabbedComponent>
                    <Directory model={new DirectoryModel()} title={"연락처"}/>
                    <PageFinder indexModel={contentModel.index["search"]} title={"검색"} goToFnc={goTo}/>
                </TabbedComponent>
            </OffCanvasExample>
            <CarouselComp active={active} goToFunc={goTo}>
                {renderPages()}
            </CarouselComp>
            <PageController className={"fixed-bottom"} current={active} total={(length()) & ~1} nextText={"다음"}
                            goToFnc={goTo}
                            nextClickFnc={() => {
                                movePage(1)
                            }}
                            prevClickFnc={() => {
                                movePage(-1)
                            }}
                            resetClickFnc={() => {
                                goTo(0)
                            }}
                            prevText={"이전"}/>
        </div>
    );
};

export default AlbumMobile;
