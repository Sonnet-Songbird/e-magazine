import React, {useRef, useState} from "react";
import HTMLFlipBook from "react-pageflip";
import './StPageFlipDesktopTheme.css';


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
                {/*<div className="page-image"></div>*/}
                {props.children}
                <div className="page-footer">{props.number + 1}</div>
            </div>
        </div>
    );
});

const StPageFlipDesktopTheme = ({contentModel}) => {
    const [page, setPage] = useState(0);
    const flipBookRef = useRef(null);
    const contents = () => {
        return contentModel.contents
    }
    const length = () => {
        return contentModel.contents.length
    }
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

    const pageList = () => {
        if (!contents()) {
            return [];
        }
        return contents().map((content, index) => {
            if (index === 0 || index === length()) {
                return <PageCover content={content} key={index}/>;
            }
            return <Page key={index} number={index}>{content}</Page>;
        });
    };

    // useEffect(() => {
    //     functions["goTo"] = flip
    // }, [functions]);

    return (
        <div style={{overflow: "hidden"}}>
            <HTMLFlipBook
                width={550}
                height={733}
                minWidth={315}
                maxWidth={1000}
                minHeight={420}
                maxHeight={1350}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onPage}
                className="flip-book relative bg-primary-100 pointer-events-auto border"
                ref={flipBookRef}
                autoSize>
                {pageList()}
            </HTMLFlipBook>

            <div className="container">
                <div>
                    <button type="button" onClick={prevButtonClick}>
                        Previous page
                    </button>
                    [<span>{page + 1}</span> of <span>{length()}</span>]
                    <button type="button" onClick={nextButtonClick}>
                        Next page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StPageFlipDesktopTheme;
