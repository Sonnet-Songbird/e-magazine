import React, {useRef, useState} from 'react';

const PageFinder = ({indexModel, goToFnc}) => {
    const [result, setResult] = useState([]);
    const inputRef = useRef();

    const findPagesByKeyword = () => {
        const keyword = inputRef.current.value;
        if (keyword === undefined) {
            return;
        }
        setResult(indexModel.find(keyword));
    };

    return (
        <div id="pageFinder">
            <input type="text" ref={inputRef}/>
            <button onClick={findPagesByKeyword}>검색</button>
            <div>
                {result.map((pageIdx, index) => (
                    <React.Fragment key={index}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <span>페이지: {pageIdx}</span>
                            {goToFnc && (
                                <button onClick={() => goToFnc(pageIdx)}>바로가기</button>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default PageFinder;
