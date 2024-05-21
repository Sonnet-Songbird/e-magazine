//TODO:Not tested

import React from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

function PageController({ current, total, prevClickFnc, nextClickFnc, prevText = "Prev", nextText = "Next" }) {
    const progress = (current / total) * 100;

    return (
        <div>
            <Button variant="primary" onClick={prevClickFnc}>{prevText}</Button>{' '}
            <ProgressBar now={progress} />
            <Button variant="primary" onClick={nextClickFnc}>{nextText}</Button>{' '}
        </div>
    );
}

export default PageController;
