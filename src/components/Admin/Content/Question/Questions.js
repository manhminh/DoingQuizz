import { useState } from 'react';
import Select from 'react-select';
import "./Questions.scss";
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai"

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [seletedQuiz, setSeletedQuiz] = useState({});

    return (
        <div className="questions-container">
            <div className="title">
                Manage Question
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={seletedQuiz}
                        onChange={setSeletedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add question:
                </div>
                <div>
                    <div className='question-content'>
                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder='name@gmail.com' />
                            <label >Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-upload'>Upload Image</label>
                            <input type='file' hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <AiOutlinePlusCircle className='icon-add' />
                            </span>

                            <span>
                                <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                    <div className='answers-content'>
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" placeholder='name@gmail.com' />
                            <label >Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <AiOutlinePlusSquare className='icon-add' />
                            </span>

                            <span>
                                <AiOutlineMinusSquare className='icon-remove' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions