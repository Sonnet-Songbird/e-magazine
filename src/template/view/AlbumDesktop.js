import './AlbumDesktop.css';
import React, {useEffect, useState} from "react";
import PageController from "../../component/PageController";

const AlbumDesktop = ({contentModel}) => {
    const [selectedChkbox, goTo] = useState(0)
    const contents = () => {
        return contentModel.contents
    }
    const length = () => {
        return contentModel.contents.length
    }

    function movePage(number) {
        const target = (selectedChkbox + number * 2) & ~1;
        if (target <= length()) {
            goTo(target)
        }
    }


    useEffect(() => {
        const pageCount = Math.ceil(length());
        if (selectedChkbox < 0) {
            goTo(0)
            return
        }
        if (selectedChkbox > pageCount) {
            goTo(pageCount)
            return
        }
        const pageIdx = Math.ceil(selectedChkbox / 2);
        const chkboxes = document.querySelectorAll(".flipChkbox");
        chkboxes.forEach((item, index) => {
            item.removeAttribute("checked");

            if (index < pageIdx) {
                item.setAttribute("checked", "");
            }
        });
    }, [contentModel, selectedChkbox]);

    useEffect(() => {
        const pageCount = Math.ceil(length());
        for (let i = 1; i <= pageCount; i++) {
            const pageIndex = Math.ceil(i / 2)
            const pageId = `#p${pageIndex}`;
            const checkboxId = `#c${pageIndex}`;
            const css = `
                ${pageId} {
                    z-index: ${pageCount - (pageIndex - 1)};
                }
                ${checkboxId}:checked ~ .flip-book ${pageId} {
                    transform: rotateY(-180deg);
                    z-index: ${pageIndex};
                }
            `;
            const style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        }
    }, [contentModel]);

    const renderPages = () => {
        const pageCount = Math.ceil(length() / 2);
        return Array.from({ length: pageCount }, (_, idx) => {
            const frontIndex = idx * 2;  // 0, 2, 4, ...
            const backIndex = frontIndex + 1;  // 1, 3, 5, ...
            const frontContent = contents()[frontIndex];
            const backContent = contents()[backIndex];
            return (
                <div className="flip" key={idx} id={`p${idx + 1}`}>
                    <div className="front" onClick={() => goTo(selectedChkbox + 2)}>
                        {frontContent !== undefined && frontContent}
                    </div>
                    {backContent !== undefined &&
                        <div className="back" onClick={() => goTo(selectedChkbox - 2)}>
                            {backContent}
                        </div>
                    }
                </div>
            );
        });
    };


    const renderCheckboxes = () => {
        return Array.from({length: Math.ceil(length() / 2 - 1)}, (_, idx) => (
            <input key={idx} type="checkbox" className="flipChkbox" id={`c${idx + 1}`}/>
        ));
    };

    return (
        <div>
            <div className="book">
                {renderCheckboxes()}
                <div id="aside">
                    {/*{utils["Tabbed"]}*/}
                </div>
                <div className="flip-book">
                    {renderPages()}
                </div>
            </div>
            <PageController current={selectedChkbox} total={(length()) & ~1} nextText={"다음"}
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
            {/*<div>{utils["PageFinder"] !== undefined && utils["PageFinder"]}*/}
            {/*</div>*/}
        </div>
    );
};

export default AlbumDesktop;
