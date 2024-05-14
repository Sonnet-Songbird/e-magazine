import React from 'react';
import './PaperAlbumDesktopTheme.css';

const PaperAlbumDesktopTheme = ({contents}) => {

    const renderPages = () => {
        return contents.map((content, index) => (
            <React.Fragment key={index}>
                {/* 각 페이지를 동적으로 생성 */}
                <input type="radio" name="page" id={`page-${index + 1}`}/>
                <label htmlFor={`page-${index + 1}`} className={`book__page book__page--${index + 1}`}>
                    <div className="page__content">
                        <h1 className="page__content-title">{content.title}</h1>
                        <div className="page__number">{index + 1}</div>
                    </div>
                </label>
            </React.Fragment>
        ));
    };

    return (
        <div className="cover">
            <div className="book">
                <label htmlFor="page-1" className="book__page book__page--1">
                    <div className="book__page-front">
                        <div className="page__content">
                            {contents[0] !== undefined && contents[0]}
                            <div className="page__number">1</div>
                        </div>
                    </div>
                </label>

                <label htmlFor="page-2" className="book__page book__page--4">
                    <div className="page__content">
                        {contents[3] !== undefined && contents[3]}
                        <div className="page__number">4</div>
                    </div>
                </label>

                <input type="radio" name="page" id="page-1"/>
                <input type="radio" name="page" id="page-2"/>
                <label className="book__page book__page--2">
                    <div className="book__page-front">
                        <div className="page__content">
                            {contents[1] !== undefined && contents[1]}

                        </div>
                        <div className="page__number">2</div>
                    </div>
                    <div className="book__page-back">
                        <div className="page__content">
                            {contents[2] !== undefined && contents[2]}
                            <div className="page__number">3</div>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default PaperAlbumDesktopTheme;
