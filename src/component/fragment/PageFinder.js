import React, {useRef, useState} from 'react';

const PageFinder = ({indexModel, goToFnc}) => {
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
                goToFnc(idx)
        }
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
                        <tr key={index} onClick={() => rowClickHandler(item.idx)}>
                            <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.keyword}</td>
                            <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.idx}</td>
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
            <ResultTable result={result} goToFnc={goToFnc}/>
        </div>
    );
};

export default PageFinder;
