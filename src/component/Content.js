import React, {useEffect, useState} from 'react';
import './Content.css';

const Content = ({editable: viewEditable, page}) => {
// 상속받은 regester 콜백으로 상위 컴포넌트에 setter를 넘겨주는 방법으도 가능하지만 별로 좋지않은 방법.
    const editable = () => {
        return document.querySelector("#editchkbox").checked
    }
    const [pageHTML, setPageHTML] = useState()
    const contentsNodeList = () => {
        return document.querySelectorAll("#ContentWrapper > *")
    }
    useEffect(() => {
        initNodes(editable(), contentsNodeList())
    }, []);
    const initNodes = (editable, NodeList) => {

        // 선언부
        const handleKeyDown = (event) => {
            const currentElement = event.target;
            if (event.key === 'Enter' && event.shiftKey && document.activeElement === currentElement) {
                event.preventDefault();
                if (currentElement.getAttribute('contenteditable')) {
                    const newParagraph = document.createElement('p');
                    currentElement.parentNode.insertBefore(newParagraph, currentElement.nextSibling);
                    initNodes(editable, [newParagraph]);
                    newParagraph.focus();
                }
            }
        }

        // 함수부
        function makeChildrenEditable() {
            NodeList.forEach(elem => {
                if (elem.classList.contains("editable")) {
                    return
                }
                elem.classList.add("editable");
                elem.addEventListener('keydown', handleKeyDown);
            });
        }

        function updateEditable() {
            document.querySelectorAll(".editable").forEach(elem => {
                if (editable) {
                    elem.setAttribute("contenteditable", "true");
                } else {
                    elem.removeAttribute("contenteditable");
                }

            })
        }

        // 초기화
        makeChildrenEditable();
        updateEditable();
    }

    useEffect(() => {
        initNodes(editable(), contentsNodeList())
    }, [viewEditable]);
    return (
        <div id="ContentWrapper"
             dangerouslySetInnerHTML={{__html: page.content}}>
        </div>
    );
}

export default Content;
