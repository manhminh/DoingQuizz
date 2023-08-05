import { useState, useRef } from "react";
import "./ManageQuiz.scss"
import Select from 'react-select';
import { toast } from "react-toastify"
import { postCreateNewQuiz } from "../../../../services/apiServices";

const ManageQuiz = (props) => {
    const imageInputRef = useRef(null);
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        console.log('check res', res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            imageInputRef.current.value = null;
            setImage(null)
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <hr />
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="your quiz name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Description</label>
                    </div>
                    <div className="my-3">
                        <Select
                            defaultValue={type}
                            onChange={setType}
                            options={options}
                            placeholder={"Quiz type..."}
                        />
                    </div>
                    <div className="more-actions form-group">
                        <label className="mb-1">Upload Image</label>
                        <input
                            ref={imageInputRef}
                            type="file"
                            className="form-control"
                            onChange={(e) => handleChangeFile(e)}
                        />
                    </div>

                    <div className="mt-3">
                        <button className="btn btn-warning" onClick={() => handleSubmitQuiz()}>Save</button>
                    </div>
                </fieldset>
            </div>

            <div className="list-detail">
                table
            </div>
        </div>
    )
}

export default ManageQuiz;
