import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUser } from "../../../../services/apiServices";
import Select from 'react-select';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [seletedQuiz, setSeletedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [seletedUser, setSeletedUser] = useState({});

    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        console.log('check res', res);
        if (res && res.EC === 0) {
            res.DT = res.DT.map(item => {
                return ({
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                })
            })
            setListQuiz(res.DT)
        }
    }

    const fetchListUser = async () => {
        let res = await getAllUser();
        console.log('check res', res);
        if (res && res.EC === 0) {
            res.DT = res.DT.map(user => {
                return ({
                    value: user.id,
                    label: `${user.id} - ${user.username} - ${user.email}`
                })
            })
            setListUser(res.DT)
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
                <button className="btn btn-warning mt-3">Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz