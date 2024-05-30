import React, {useState} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function OffCanvasExample({children, ...props}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    //나중에 햄버거 버튼 버튼컴포넌트 상속하는 방식으로 변경해서 다른 모양으로도 쓸 수 있게 해야함.
    return (
        <div className={"offcanvas-wrapper"}>
            <div style={{textAlign: "right"}}>
            <svg className="btn-offcanvas" viewBox="0 0 30 30" fill="none" onClick={toggleShow}
                 xmlns="http://www.w3.org/2000/svg">
                <path className="menu1" d="M 12 5 L 30 5" stroke="#000000" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path className="menu2" d="M 6 12 L 30 12" stroke="#000000" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path className="menu3" d="M 8 19 L 30 19" stroke="#000000" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path className="menu4" d="M 0 26 L 30 26" stroke="#000000" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>메뉴</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {children}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
