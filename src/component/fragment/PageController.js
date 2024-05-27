//TODO:Not tested

import React from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

function PageController({
                            current,
                            total,
                            prevClickFnc,
                            nextClickFnc,
                            resetClickFnc,
                            prevText = "Prev",
                            nextText = "Next",
                            resetText = "Reset"
                        }) {
    const progress = (current / total) * 100;
    return (
        <div style={{display: "flex"}} className="button-progress-container">
            <Button variant="primary" onClick={prevClickFnc}>{prevText}</Button>{' '}
            <ProgressBar now={progress} animated label={`${current} / ${total}`} className="flex-grow-1"/>
            <Button variant="primary" onClick={nextClickFnc}>{nextText}</Button>{' '}
            <Button variant="primary" onClick={resetClickFnc}>{resetText}</Button>{' '}
        </div>
    );
}

export default PageController;
