import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function PageController({
                                           current,
                                           total,
                                           prevClickFnc,
                                           nextClickFnc,
                                           resetClickFnc,
                                           goToFnc,
                                           prevText = "Prev",
                                           nextText = "Next",
                                           resetText = "Reset"
                                       }) {
    const [inputValue, setInputValue] = useState(current);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    useEffect(() => {
        setInputValue(current)
    }, [current]);

    const handleInputBlur = () => {
        const value = parseInt(inputValue, 10);
        if (value >= 0 && value <= total) {
            goToFnc(value);
        } else {
            setInputValue(current);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem"}}
             className="page-controller-container p-3">
            <div className={"control-page-count"}
                 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Form.Control
                    className={"control-page-current control-page-input"}
                    type="number"
                    style={{border: "1px solid #4699EB", textAlign: "center", color: "#4699EB"}}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyPress={handleKeyPress}
                    min={0}
                    max={total}
                />
                <Form.Label className="p-2 contol-page-slash">
                    &nbsp;/&nbsp;
                </Form.Label>
                <Form.Control
                    type="number"
                    className="control-page-total control-page-input"
                    value={total}
                    aria-label="total count"
                    disabled
                />
            </div>

            {prevClickFnc || nextClickFnc || resetClickFnc ? (
                <div className={"btn-container"}
                     style={{display: "flex", justifyContent: "space-between", gap: "0.5rem"}}>
                    {prevClickFnc && (
                        <Button className="btn-prev " variant="outline-primary" onClick={prevClickFnc}
                                style={{border: '#4699EB solid 3px'}}>
                            {prevText}
                        </Button>
                    )}
                    {resetClickFnc && (
                        <Button className="btn-reset " variant="outline-primary" onClick={resetClickFnc}
                                style={{border: '#4699EB solid 3px'}}>
                            {resetText}
                        </Button>
                    )}
                    {nextClickFnc && (
                        <Button className="btn-next " variant="outline-primary" onClick={nextClickFnc}
                                style={{border: '#4699EB solid 3px'}}>
                            {nextText}
                        </Button>
                    )}
                </div>
            ) : null}
        </div>
    );
}
