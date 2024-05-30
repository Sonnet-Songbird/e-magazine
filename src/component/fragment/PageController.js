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
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem"}}
             className="page-controller-container p-3">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Form.Control
                    type="number"
                    className="border-3 border-info"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyPress={handleKeyPress}
                    min={0}
                    max={total}
                />
                <Form.Label className="p-2 text-info" style={{lineHeight: "100%", fontWeight: "bold"}}>
                    &nbsp;/&nbsp;
                </Form.Label>
                <Form.Control
                    type="number"
                    className="border-0"
                    value={total}
                    style={{backgroundColor: "transparent"}}
                    aria-label="total count"
                    disabled
                />
            </div>

            {prevClickFnc || nextClickFnc || resetClickFnc ? (
                <div style={{display: "flex", justifyContent: "space-between", gap: "0.5rem"}}>
                    {prevClickFnc && (
                        <Button className="btn-prev rounded-pill" variant="outline-primary" onClick={prevClickFnc}>
                            {prevText}
                        </Button>
                    )}
                    {resetClickFnc && (
                        <Button className="btn-reset rounded-pill" variant="outline-primary" onClick={resetClickFnc}>
                            {resetText}
                        </Button>
                    )}
                    {nextClickFnc && (
                        <Button className="btn-next rounded-pill" variant="outline-primary" onClick={nextClickFnc}>
                            {nextText}
                        </Button>
                    )}
                </div>
            ) : null}
        </div>
    );
}
