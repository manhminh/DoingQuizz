import { useEffect } from "react";
import { useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiServices";

const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        console.log('check res', res);
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
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
                                        <button className="btn btn-warning">Edit</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default TableQuiz