import './AlbumMobile.css';
import React, {useEffect, useRef, useState} from "react";
import CarouselComp from "../../component/fragment/CarouselComp";
import PageController from "../../component/fragment/PageController";
import Offcanvas from "react-bootstrap/Offcanvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {album41Directory} from "../../repository/Content/album41Model";

const AlbumMobile = ({contentModel}) => {

        const contents = () => {
            return contentModel.contents;
        };
        const length = () => {
            return contentModel.contents.length;
        };
        const [directoryModel, setDirectoryModel] = useState()
        const [directoryList, setDirectoryList] = useState()
        const [searchResult, setSearchResult] = useState()
        const [active, goTo] = useState(0);
        const [offcanvasShow, setOffcanvasShow] = useState(false)
        const [showNoResult, setShowNoResult] = useState(false)
        const searchInput = useRef();

        function movePage(number) {
            const target = (active + number) % length();
            const adjustedTarget = target < 0 ? length() + target : target;
            goTo(adjustedTarget);
        }


        useEffect(() => {
            tempInitDirectoryModel()
        }, [contentModel]);

        useEffect(() => {
            initDirectoryList()

        }, [directoryModel]);
        const tempInitDirectoryModel = () => {
            setDirectoryModel(album41Directory)
        }

        const initDirectoryList = () => {
            if (directoryModel) {
                setDirectoryList(directoryModel.profiles)
            }
        }

        const renderPages = () => {
            return contents().map((frontContent, idx) => (
                <div className="item" key={idx} id={`p${idx + 1}`}>
                    {frontContent !== undefined && frontContent}
                </div>
            ));
        };

        function onDirectoryClick(number) {
            if (typeof number === "number") {
                const target = Number.parseInt(number)
                goTo(target)
            } else {
                goTo(0)
            }
            setOffcanvasShow(false)
        }

        const onResultClick = (index, that) => {
            goTo(index)
        }

        function toggleOffcanas() {
            setOffcanvasShow(!offcanvasShow)
        }

        const onSearchBtn = () => {
            const keyword = searchInput.current.value;
            searchInput.current.value = ""
            const result = directoryModel.findByName(keyword)
            setSearchResult(result)
            setShowNoResult(true)
            if (result.length === 1) {
                goTo(result[0].index)
            }
        }
        const onKeyDown = (event) => {
            if (event.key === "Enter") {
                onSearchBtn();
            }
        };
        return (
            <div className={"album-mobile"}>
                <div className={"album-mobile-inner"}>
                    <div className={"mobile-header"}>
                        <div className={"mobile-header-icon-wrapper"}>
                            <img className="mark-headong" alt="headong_mark.png"
                                 src="https://sonnet-songbird.github.io/e-magazine/pics/haedong_mark.png"/>
                            <svg className="btn-offcanvas" viewBox="0 0 30 30" fill="none" onClick={toggleOffcanas}
                                 xmlns="http://www.w3.org/2000/svg">
                                <path className="menu1" d="M 12 10 L 30 10" stroke="#000000" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="menu2" d="M 6 15.5 L 30 15.5" stroke="#000000" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="menu3" d="M 8 21 L 30 21" stroke="#000000" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="menu4" d="M 0 26 L 30 26" stroke="#000000" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <Offcanvas show={offcanvasShow} backdrop={false}>
                            <div className={"offcanvas-table-wrapper"}>
                                <table className={"offcanvas-table"}>
                                    <thead className={"offcanvas-table-header"}>
                                        <tr className={"offcanvas-table-headerRow"}>
                                            <th>기수</th>
                                            <th>성명</th>
                                            <th>연락처</th>
                                            <th>소속</th>
                                            <th>페이지</th>
                                        </tr>
                                    </thead>
                                    <tbody className="offcanvas-table-body">
                                        {directoryList && Array.isArray(directoryList) && directoryList.length > 0 ? (
                                            directoryList.map((item, index) => {
                                                return item.getTableRow(onDirectoryClick);
                                            })
                                        ) : (
                                            <tr>
                                                <td className={"offcanvas-table-noResult profile-tableBody-tr"}
                                                    colSpan="5">
                                                    등록된 연락처가 없습니다.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Offcanvas>
                        <div className={"header-search-box"}>
                            <input className={"header-search-input"} placeholder={"이름을 입력해주세요"} ref={searchInput}
                                   onKeyDown={onKeyDown}/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#4699EB",}}
                                             className={"header-search-btn"} onClick={onSearchBtn}/>
                        </div>
                        <div className={"header-search-resultWrapper"}>
                            <table className={"header-search-result"}>
                                <thead className={"header-search-header"}>
                                    {/*포매팅 헤더. 스타일상으론 나타나지 않아야 함 */}
                                    <tr className={"header-search-headerRow"}>
                                        <th>소속</th>
                                        <th>성명</th>
                                        <th>연락처</th>
                                        <th>메일</th>
                                    </tr>
                                </thead>
                                <tbody className="header-search-body">
                                    {searchResult && Array.isArray(searchResult) && searchResult.length > 0 ? (
                                        searchResult.map((item, index) => {
                                            return item.getTableRow(onResultClick);
                                        })
                                    ) : (
                                        showNoResult ? (
                                            <tr>
                                                <td className="header-search-noResult profile-tableBody-tr" colSpan="5">
                                                    결과가 없습니다.
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td className="header-search-noResult profile-tableBody-tr" colSpan="5">
                                                    이름을 검색 하여 이동 할 수 있습니다.
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <CarouselComp active={active} goToFunc={goTo} touch ={false}>
                        {renderPages()}
                    </CarouselComp>
                    <PageController className={"fixed-bottom"} current={active} total={(length()) - 1}
                                    goToFnc={goTo}
                                    resetText={"처음으로"}
                                    resetClickFnc={() => {
                                        goTo(0)
                                    }}
                    />
                </div>
            </div>
        );
    }
;

export default AlbumMobile;
