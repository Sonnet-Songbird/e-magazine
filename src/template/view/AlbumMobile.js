import './AlbumMobile.css';
import React, {useEffect, useState} from "react";
import {Directory} from "../../component/fragment/Directory";
import {DirectoryModel} from "../../model/ProfileModel";
import PageFinder from "../../component/fragment/PageFinder";
import OffCanvasExample from "../../component/fragment/MobileOffcanvas";
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

            <div className={"mobile-header"}>
                <OffCanvasExample name={""}>
                    <Directory model={new DirectoryModel()} title={"연락처"}/>
                </OffCanvasExample>
                <PageFinder indexModel={contentModel.index["pageSearch"]} title={"검색"} goToFnc={goTo} matchAndGo={true}
                            showHeader={false}/>
            </div>
            <CarouselComp active={active} goToFunc={goTo}>
                {renderPages()}
            </CarouselComp>
            <PageController className={"fixed-bottom"} current={active} total={(length()) & ~1}
                            goToFnc={goTo}
                            resetText={"처음으로"}
                            resetClickFnc={() => {
                                goTo(0)
                            }}
            />
        </div>
    );
};

export default AlbumMobile;
