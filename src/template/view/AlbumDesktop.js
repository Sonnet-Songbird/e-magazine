import React, {useEffect, useState} from "react";
import PageController from "../../component/fragment/PageController";
import PageFinder from "../../component/fragment/PageFinder";
import "./AlbumDesktop.css";

const AlbumDesktop = ({contentModel}) => {
    const [selectedChkbox, goTo] = useState(0);

    const contents = () => {
        return contentModel.contents;
    };

    const length = () => {
        return contentModel.contents.length;
    };

    const movePage = (number) => {
        const target = (selectedChkbox + number * 2) & ~1;
        if (target <= length()) {
            goTo(target);
        }
    };

    useEffect(() => {
        const pageCount = Math.ceil(length());
        if (selectedChkbox < 0) {
            goTo(0);
            return;
        }
        if (selectedChkbox > pageCount) {
            goTo(pageCount);
            return;
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
        let css = '';

        for (let i = 1; i <= pageCount; i++) {
            const pageIndex = Math.ceil(i / 2);
            const pageId = `#p${pageIndex}`;
            const checkboxId = `#c${pageIndex}`;

            css += `
            ${pageId} {
                z-index: ${pageCount - (pageIndex - 1)};
            }
            ${checkboxId}:checked ~ .flip-book ${pageId} {
                transform: rotateY(-180deg);
                z-index: ${pageIndex};
            }
        `;

            if (i === pageCount) {
                css += `
                ${checkboxId}:checked ~ .book-aside {
                    width: 0;
                }
                ${checkboxId}:checked ~ .flip-book {
                    transform: translateX(570px);
                    box-shadow: none;
                }
                ${checkboxId}:checked ~ .flip-book ${pageId} {
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);                
                }
            `;
            }
        }

        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }, [contentModel]);

    const renderPages = () => {
        const pageCount = Math.ceil(length() / 2);
        return Array.from({length: pageCount}, (_, idx) => {
            const frontIndex = idx * 2; // 0, 2, 4, ...
            const backIndex = frontIndex + 1; // 1, 3, 5, ...
            const frontContent = contents()[frontIndex];
            const backContent = contents()[backIndex];
            return (
                <div className="flip" key={idx} id={`p${idx + 1}`}>
                    <div className="front" onClick={() => goTo(selectedChkbox + 2)}>
                        {frontContent !== undefined && frontContent}
                    </div>
                    {backContent !== undefined && (
                        <div className="back" onClick={() => goTo(selectedChkbox - 2)}>
                            {backContent}
                        </div>
                    )}
                </div>
            );
        });
    };
    useEffect(() => {
        if (selectedChkbox % 2 !== 0) {
            goTo(selectedChkbox + 1);
        }
    }, [selectedChkbox]);

    const renderCheckboxes = () => {
        return Array.from({length: Math.ceil(length() / 2)}, (_, idx) => (
            <input key={idx} type="checkbox" className="flipChkbox" id={`c${idx + 1}`}/>
        ));
    };

    return (
        <div className="album-desktop">
            <aside className="aside-section">
                <div className="aside-wrapper">
                    <div className="aside-header">
                        <img
                            className="mark-headong"
                            alt="headong_mark.png"
                            src="https://sonnet-songbird.github.io/e-magazine/pics/haedong_mark.png"
                        />
                        <PageFinder indexModel={contentModel.index["pageSearch"]} title={"검색"} goToFnc={goTo}
                                    matchAndGo={true}/>
                    </div>

                </div>
            </aside>
            <div className="reading-section">
                <div className={"book"}>
                    {renderCheckboxes()}
                    <div className={"book-aside book-side"}>
                    </div>
                    <div className={"flip-book book-side"}>
                        {renderPages()}
                    </div>
                </div>
                <PageController
                    current={selectedChkbox}
                    total={(length()) & ~1}
                    nextText={"다음"}
                    goToFnc={goTo}
                    nextClickFnc={() => {
                        movePage(1);
                    }}
                    prevClickFnc={() => {
                        movePage(-1);
                    }}
                    resetClickFnc={() => {
                        goTo(0);
                    }}
                    prevText={"이전"}
                />
            </div>
        </div>
    );
};

export default AlbumDesktop;
