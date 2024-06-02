import React, {useEffect, useRef, useState} from "react";
import PageController from "../../component/fragment/PageController";
import "./AlbumDesktop.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {DirectoryModel} from "../../model/ProfileModel";

const AlbumDesktop = ({contentModel}) => {
    const [currentPage, goTo] = useState(0);
    const [directoryModel, setDirectoryModel] = useState()
    const [searchResult, setSearchResult] = useState()
    const searchInput = useRef();
    const contents = () => {
        return contentModel.contents;
    };

    const length = () => {
        return contentModel.contents.length;
    };

    useEffect(() => {
        const pageCount = Math.ceil(length());
        if (currentPage < 0) {
            goTo(0);
            return;
        }
        if (currentPage > pageCount) {
            goTo(pageCount);
            return;
        }
        const pageIdx = Math.ceil(currentPage / 2);
        const chkboxes = document.querySelectorAll(".flipChkbox");
        chkboxes.forEach((item, index) => {
            item.removeAttribute("checked");

            if (index < pageIdx) {
                item.setAttribute("checked", "");
            }
        });
    }, [contentModel, currentPage]);


    useEffect(() => {
        initFlippageStyle();
        tempInitDirectoryModel()
    }, [contentModel]);


    useEffect(() => {
        if (currentPage % 2 !== 0) {
            goTo(currentPage + 1);
        }
    }, [currentPage]);


    useEffect(() => {
        initSearchResult()
    }, [directoryModel]);


    function initFlippageStyle() {
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
    }

    const renderPages = () => {
        const pageCount = Math.ceil(length() / 2);
        return Array.from({length: pageCount}, (_, idx) => {
            const frontIndex = idx * 2; // 0, 2, 4, ...
            const backIndex = frontIndex + 1; // 1, 3, 5, ...
            const frontContent = contents()[frontIndex];
            const backContent = contents()[backIndex];
            return (
                <div className="flip" key={idx} id={`p${idx + 1}`}>
                    <div className="front" onClick={() => goTo(currentPage + 2)}>
                        {frontContent !== undefined && frontContent}
                    </div>
                    {backContent !== undefined && (
                        <div className="back" onClick={() => goTo(currentPage - 2)}>
                            {backContent}
                        </div>
                    )}
                </div>
            );
        });
    };
    const renderCheckboxes = () => {
        return Array.from({length: Math.ceil(length() / 2)}, (_, idx) => (
            <input key={idx} type="checkbox" className="flipChkbox" id={`c${idx + 1}`}/>
        ));
    };


    //TODO: temp
    const tempInitDirectoryModel = () => {
        const model = DirectoryModel.createMock();
        setDirectoryModel(model)
    }

    const initSearchResult = () => {
        if (directoryModel) {
            setSearchResult(directoryModel.profiles)
        }
    }

    const onSearchBtn = () => {
        const keyword = searchInput.current.value;
        const result = directoryModel.findByName(keyword)
        setSearchResult(result)
        if (result.length === 1) {
            goTo(result[0].index)
        }
    }
    const onResultClick = (index, that) => {
        goTo(index)
    }
    const movePage = (number) => {
        const target = (currentPage + number * 2) & ~1;
        if (target <= length()) {
            goTo(target);
        }
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
                        <div className={"aside-search-box"}>
                            <input className={"aside-search-input"} placeholder={"이름을 입력해주세요"} ref={searchInput}/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#4699EB",}}
                                             className={"aside-search-btn"} onClick={onSearchBtn}/>
                        </div>


                    </div>
                    <div className={"aside-body"}>
                        <div className={"aside-search-resultWrapper"}>
                            <table className={"aside-search-result"}>
                                <thead className={"aside-search-header"}>
                                    <tr className={"aside-search-headerRow"}>
                                        <th>소속</th>
                                        <th>성명</th>
                                        <th>연락처</th>
                                        <th>메일</th>
                                        <th>메모</th>
                                    </tr>
                                </thead>
                                <tbody className="aside-search-body">
                                    {searchResult && Array.isArray(searchResult) && searchResult.length > 0 ? (
                                        searchResult.map((item, index) => {
                                            return item.getTableRow(onResultClick);
                                        })
                                    ) : (
                                        <tr>
                                            <td className={"aside-search-noResult profile-tableBody-tr"} colSpan="5">
                                                결과가 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
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
                    current={currentPage}
                    total={(length()) & ~1}
                    nextText={"다음"}
                    goToFnc={goTo}
                    nextClickFnc={() => {
                        movePage(1);
                    }}
                    prevClickFnc={() => {
                        movePage(-1);
                    }}
                    resetText={"처음으로"}
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
