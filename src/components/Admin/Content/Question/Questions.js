import Select from 'react-select';
import "./Questions.scss";
import _ from "lodash"
import { useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [seletedQuiz, setSeletedQuiz] = useState({});

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: 'question 1',
                imgageFile: '',
                imgageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    },
                ],
            },
        ]
    );

    const handleAddReomveQuestion = (type, questionId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            let newQuestion = {
                id: uuidv4(),
                description: 'question 1',
                imgageFile: '',
                imgageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    },
                ],
            }
            setQuestions([...questionsClone, newQuestion]);
        }

        if (type === 'REMOVE') {
            questionsClone = questionsClone.filter(item => item.id !== questionId);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (type === 'ADD') {
            let newAnswer = {
                id: uuidv4(),
                description: 'answer 1',
                isCorrect: false
            }
            questionClone[index].answers = [...questionClone[index].answers, newAnswer];
            setQuestions(questionClone);
        }

        if (type === 'REMOVE') {
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionClone);
        }
    }


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

                {questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div className='q-main mb-4' key={question.id}>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='name@example.com'
                                            value={question.description}
                                        />
                                        <label >Question {index + 1} 's description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label >
                                            <RiImageAddFill className='label-upload' />
                                        </label>
                                        <input type='file' hidden />
                                        <span>0 file is uploaded</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddReomveQuestion('ADD')}>
                                            <AiOutlinePlusCircle className='icon-add' />
                                        </span>

                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddReomveQuestion('REMOVE', question.id)}>
                                                <AiOutlineMinusCircle className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {question.answers && question.answers.length &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div className='answers-content' key={answer.id}>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='name@example.com'
                                                        value={answer.description}
                                                    />
                                                    <label >Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiOutlinePlusSquare className='icon-add' />
                                                    </span>

                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusSquare className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Questions