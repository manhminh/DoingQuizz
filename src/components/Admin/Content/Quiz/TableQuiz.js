import { useEffect } from "react";
import { useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQUiz, setShowModalUpdateQUiz] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});

    useEffect(() => {
        fetchListQuiz();
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    const handleDeleteQuiz = (quiz) => {
        setDataDelete(quiz);
        setShowModalDeleteQuiz(true);
    }

    const handleUpdateQuiz = (quiz) => {
        setDataUpdate(quiz)
        setShowModalUpdateQUiz(true);
    }

    const resetUpdateQuiz = () => {
        setDataUpdate({})
    }
    return (
        <>
            <div className="mt-2">
                List Quizzes:
            </div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td style={{ display: "flex", gap: "15px" }}>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleUpdateQuiz(item)}
                                        >
                                            Edit</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteQuiz(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQUiz}
                setShow={setShowModalUpdateQUiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
                resetUpdateQuiz={resetUpdateQuiz}
            />
        </>
    )
}

export default TableQuiz