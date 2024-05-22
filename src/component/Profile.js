//TODO:Not tested
import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

export function Profile({model, functions}) {
    const [show, setShow] = useState(false);
    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);

    useEffect(() => {
        functions["modalShow"] = setShow
    }, [functions]);

    return (
        <Modal show={show} onHide={modalClose}>
            <div className="profile-container">
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
            </div>
        </Modal>
    );
}
