import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from "../../../../services/apiServices";
import Select from 'react-select';
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [seletedQuiz, setSeletedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [seletedUser, setSeletedUser] = useState({});
    console.log(seletedQuiz);
    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let quizzes = res.DT.map(item => {
                return ({
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                })
            })
            setListQuiz(quizzes)
        }
    }
    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let users = res.DT.map(user => {
                return ({
                    value: user.id,
                    label: `${user.id} - ${user.username} - ${user.email}`
                })
            })
            setListUser(users)
        }
    }

    const handleAssign = async () => {
        console.log(seletedQuiz, seletedUser);
        let res = await postAssignQuiz(seletedQuiz.value, seletedUser.value);
        console.log(res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label>Select Quiz:</label>
                <Select
                    defaultValue={seletedQuiz}
                    onChange={setSeletedQuiz}
                    options={listQuiz}
                />
            </div>

            <div className='col-6 form-group'>
                <label>Select User:</label>
                <Select
                    defaultValue={seletedUser}
                    onChange={setSeletedUser}
                    options={listUser}
                />
            </div>

            <div>
                <button
                    className="btn btn-warning mt-3"
                    onClick={() => handleAssign()}
                >
                    Assign
                </button>
            </div>
        </div>
    )
}
export default AssignQuiz