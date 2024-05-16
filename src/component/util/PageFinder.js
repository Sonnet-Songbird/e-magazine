import React, { useState } from 'react';

const PageFinder = ({ pages, viewFunctions }) => {
    const [result, setResult] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const findPagesByKeyword = () => {
        const foundPages = [];
        for (const page of pages) {
            if (page.keyword && page.keyword.includes(inputValue)) {
                foundPages.push(page.idx);
            }
        }
        setResult(foundPages);
    };

    return (
        <div id="pageFinder">
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button onClick={findPagesByKeyword}>검색</button>
            <div>
                {result.map((pageIdx, index) => (
                    <React.Fragment key={index}>
                        <div>
                            <span style={{ float: 'left' }}>페이지: {pageIdx}</span>
                            {viewFunctions && viewFunctions.goTo && (
                                <button style={{ float: 'right' }} onClick={() => viewFunctions.goTo(pageIdx)}>바로가기</button>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default PageFinder;
