import React, {useEffect, useState} from 'react';
import './PaperAlbumDesktopTheme.css';
import PageController from "../../component/PageController";

const PaperAlbumDesktopTheme = ({contents, functions, utils}) => {

    const [selectedChkbox, goTo] = useState(0)

    function movePage(number) {
        const target = selectedChkbox + number *2
        if (target <= contents.length) {
            goTo(target)
        }
    }


    useEffect(() => {
        const pageCount = Math.ceil(contents.length);
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
    }, [contents.length, selectedChkbox]);

    useEffect(() => {
        const pageCount = Math.ceil(contents.length);
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
    }, [contents.length]);

    const renderPages = () => {
        const pageCount = Math.ceil(contents.length / 2);
        return Array.from({length: pageCount}, (_, idx) => {
            const pageNumber = idx + 1;
            const frontContent = contents[pageNumber * 2 - 1];
            const backContent = contents[pageNumber * 2];
            return (
                <div className="flip" key={pageNumber} id={`p${pageNumber}`}>
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
        return Array.from({length: Math.ceil(contents.length / 2 - 1)}, (_, idx) => (
            <input key={idx} type="checkbox" className="flipChkbox" id={`c${idx + 1}`}/>
        ));
    };

    useEffect(() => {
        functions["goTo"] = goTo;
    }, [functions]);
    return (
        <div>
        <div className="book">
            {renderCheckboxes()}
            <div id="aside">
                {utils["Tabbed"]}
            </div>
            <div className="flip-book">
                {renderPages()}
            </div>
        </div>
            <PageController current={selectedChkbox} total={contents.length} nextText={"다음"}
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
            <div>{utils["PageFinder"] !== undefined && utils["PageFinder"]}
            </div>
        </div>
    );
};

export default PaperAlbumDesktopTheme;
