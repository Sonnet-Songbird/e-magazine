import {useReducer} from "react";
import {Modal} from "react-bootstrap";
import "./Profile.css"
import Button from "react-bootstrap/Button";

export function Profile({model, show, setShow}) {

    const modalClose = () => setShow(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


    const mockAddMemo = (model) => {
        const str = prompt("추가 할 내용을 입력 해 주세요.")
        model.note.push(str)
        forceUpdate()
    }

    return (
        <Modal show={show} onHide={modalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{`${model.belong} ${model.name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table>
                    <thead>
                        <tr>
                            <th>Belong</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{model.belong}</td>
                            <td>{model.name}</td>
                            <td>
                                <ul>
                                    {model.contact.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {model.note.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={() => mockAddMemo(model)}>
                    메모 남기기
                </Button>
            </Modal.Footer>
        </Modal>


    )
        ;
}
