import React, {useState} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

function MobileOffcanvas({children, ...props}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    //나중에 햄버거 버튼 버튼컴포넌트 상속하는 방식으로 변경해서 다른 모양으로도 쓸 수 있게 해야함.
    return (
        <div className={"offcanvas-wrapper"}>
            <div style={{textAlign: "right"}}>

            </div>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {children}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
