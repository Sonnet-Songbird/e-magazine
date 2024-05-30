import React, {useRef, useState} from 'react';
import './PageFinder.css';
const PageFinder = ({indexModel, goToFnc, matchAndGo = false, showHeader = true}) => {
    const [result, setResult] = useState([]);
    const inputRef = useRef();

    const findPagesByKeyword = () => {
        const keyword = inputRef.current.value;
        if (keyword === undefined) {
            return;
        }
        if (!indexModel) {
            return;
        }
        setResult(indexModel.find(keyword));
    };

    const ResultTable = ({result, goToFnc}) => {
        const rowClickHandler = (idx) => {
            if (typeof goToFnc == "function")
                goToFnc(Number.parseInt(idx))
        }
        return (
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '16px'}}>
                {showHeader && (
                    <thead>
                        <tr>
                            <th style={{border: '0', padding: '8px'}}>키워드</th>
                            <th style={{border: '0', padding: '8px'}}>페이지 번호</th>
                            {goToFnc && <th style={{border: '0', padding: '8px'}}></th>}
                        </tr>
                    </thead>
                )}

                <tbody>
                    {result.map((item, index) => (
                        <tr key={index} onClick={() => rowClickHandler(item.idx)} style={{cursor: 'pointer'}}
                            className="table-row">
                            <td style={{border: '0', padding: '8px'}}>{item.keyword}</td>
                            <td style={{border: '0', padding: '8px'}}>{item.idx}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        );
    };


    return (
        <div id="pageFinder">
            <div className={"searchbar"}>
                <input type="text" placeholder="이름을 입력해주세요." ref={inputRef}/>
                {/*나중에 이 버튼도 컴포넌트로 받도록*/}
                <svg onClick={findPagesByKeyword}
                     className="btn-search"
                     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M841.3 910c-15.6 0-31.1-6.1-42.7-18.3L611.2 694c-22.3-23.6-21.3-60.7 2.2-83.1 23.6-22.3 60.8-21.3 83.1 2.2l187.4 197.7c22.3 23.6 21.3 60.7-2.2 83.1-11.4 10.8-25.9 16.1-40.4 16.1z"
                        fill="#4699EB"/>
                    <path
                        d="M450.4 760.7c-3 0-5.9 0-8.9-0.1-86-2.3-166-38-225.2-100.4-59.2-62.5-90.5-144.2-88.2-230.2 2.3-86 38-166 100.4-225.2 62.5-59.2 144.2-90.5 230.2-88.2 86 2.3 166 38 225.2 100.4 59.2 62.5 90.5 144.2 88.2 230.2-2.3 86-38 166-100.4 225.2-60.3 57.1-138.6 88.3-221.3 88.3z m-0.4-548.2c-58.1 0-113 21.9-155.3 62-43.8 41.5-68.8 97.6-70.5 158-1.6 60.3 20.4 117.7 61.9 161.5s97.6 68.8 158 70.5c60.3 1.6 117.7-20.4 161.5-61.9s68.8-97.6 70.5-158c1.6-60.3-20.3-117.7-61.9-161.5-41.5-43.8-97.6-68.8-158-70.5-2.1 0-4.1-0.1-6.2-0.1z"
                        fill="#2867CE"/>
                </svg>
            </div>
            <ResultTable result={result} goToFnc={goToFnc}/>
        </div>
    );
};

export default PageFinder;
