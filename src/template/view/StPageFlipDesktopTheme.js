import React, {useEffect, useRef, useState} from "react";
import HTMLFlipBook from "react-pageflip";
import './StPageFlipDesktopTheme.scss';


const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref} data-density="hard">
            <div className="page-content">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                {/*<h2 className="page-header">Page header - {props.number}</h2>*/}
                {/*<div className="page-image"></div>*/}
                <div className="page-text">{props.children}</div>
                {/*<div className="page-footer">{props.number + 1}</div>*/}
            </div>
        </div>
    );
});

const StPageFlipDesktopTheme = ({contents, functions, utils}) => {
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const flipBookRef = useRef(null);

    const nextButtonClick = () => {
        flipBookRef.current.pageFlip().flipNext();
    };

    const prevButtonClick = () => {
        flipBookRef.current.pageFlip().flipPrev();
    };

    const onPage = (e) => {
        setPage(e.data);
    };

    const flip = (number) => {
        flipBookRef.current.pageFlip().flip(number);
        console.log("flip onto", number)
    }

    const pageList = (contents, startFrom, endBefore) => {
        return contents.slice(startFrom, contents.length - endBefore).map((content, index) => {
            return <Page key={index} number={index + startFrom}>{content}</Page>;
        });
    };

    useEffect(() => {
        functions["goTo"] = flip
    }, [functions]);

    useEffect(function updatePageCount() {
        const interval = setInterval(() => {
            if (flipBookRef.current && flipBookRef.current.pageFlip()) {
                setTotalPage(flipBookRef.current.pageFlip().getPageCount());
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [flipBookRef]);

    const totalcount = () => {
        console.log(pageList(contents, 1, 1));
    };

    return (
        <div>
            <HTMLFlipBook
                width={550}
                height={733}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onPage}
                className="flip-book"
                ref={flipBookRef}
            >
                <PageCover>{contents[0]}</PageCover>
                {/*{pageList(contents, 1, 1)}*/}
                <PageCover>{contents[contents.length - 1]}</PageCover>
            </HTMLFlipBook>

            <div className="container">
                <div>
                    <button type="button" onClick={prevButtonClick}>
                        Previous page
                    </button>
                    [<span>{page + 1}</span> of <span>{totalPage}</span>]
                    <button type="button" onClick={nextButtonClick}>
                        Next page
                    </button>
                    <button type="button" onClick={totalcount}>Total count</button>
                    <div>{utils["PageFinder"] !== undefined && utils["PageFinder"]}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StPageFlipDesktopTheme;
