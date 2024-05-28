import React, { useEffect, useRef, useState } from 'react';

const PageFinder = ({ indexModel, goToFnc }) => {
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

    const ResultTable = ({ result, goToFnc }) => {
        return (
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '16px'}}>
                <thead>
                    <tr>
                        <th style={{border: '1px solid #ccc', padding: '8px'}}>키워드</th>
                        <th style={{border: '1px solid #ccc', padding: '8px'}}>페이지 번호</th>
                        {goToFnc && <th style={{border: '1px solid #ccc', padding: '8px'}}></th>}
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, index) => (
                        <tr key={index}>
                            <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.keyword}</td>
                            <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.number}</td>
                            {goToFnc && (
                                <td style={{border: '1px solid #ccc', padding: '8px'}}>
                                    <button onClick={() => goToFnc(item.number)}>바로가기</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };


    return (
        <div id="pageFinder">
            <input type="text" ref={inputRef}/>
            <button onClick={findPagesByKeyword}>검색</button>
            <ResultTable result={result} goToFnc={goToFnc} />
        </div>
    );
};

export default PageFinder;
