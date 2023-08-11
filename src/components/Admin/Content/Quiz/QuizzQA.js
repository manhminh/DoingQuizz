import "./QuizQA.scss";
import Select from 'react-select';
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import { useState, useEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, getQuizWithQA } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const QuizQA = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const intitQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                },
            ],
        },
    ]
    const [questions, setQuestions] = useState(intitQuestions);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [imagePreview, setImagePreview] = useState({
        url: '',
        title: ''
    })
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchListQuiz();
    }, [])

    useEffect(() => {
        fetchQuizQA();
    }, [selectedQuiz]);

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
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

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuizQA = async () => {
        if (selectedQuiz && selectedQuiz.value) {
            let res = await getQuizWithQA(selectedQuiz.value);
            if (res && res.EC === 0) {
                console.log(res);
                let newQA = [];
                for (let i = 0; i < res.DT.qa.length; i++) {
                    let question = res.DT.qa[i];
                    if (question.imageFile) {
                        question.imageName = `Question-${question.id}.png`;
                        question.imageFile = await urltoFile(`data:image/png;base64, ${question.imageFile}`, `Question-${question.id}.png`, 'image/png')
                    }
                    newQA.push(question);
                }
                console.log(newQA);
                setQuestions(newQA);
            }
        }
    }

    const handleAddReomveQuestion = (type, questionId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            let newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
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
        if (index > - 1) {
            if (type === 'ADD') {
                let newAnswer = {
                    id: uuidv4(),
                    description: '',
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
    }

    const handleOnChangeQuestion = (type, questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            if (type === 'DESCRIPTION') {
                questionClone[index].description = event.target.value;
                setQuestions(questionClone);
            }

            if (type === 'FILE' && event.target.files && event.target.files[0]) {
                questionClone[index].imageFile = event.target.files[0];
                questionClone[index].imageName = event.target.files[0].name;
                setQuestions(questionClone);
            }
        }
    }

    const handleOnChangeAnswer = (type, questionId, answerId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = event.target.checked;
                    }

                    if (type === 'INPUT') {
                        answer.description = event.target.value;
                    }
                }
                return answer;
            })
            setQuestions(questionClone);
        }
    }

    const handleChangeImagePreview = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setImagePreview({
                url: questionClone[index].imageFile,
                title: questionClone[index].imageName
            })
            setIsPreviewImage(true);
        }
    }

    const handleSubmitQuestionForQUiz = async () => {
        //validate answer 
        let isValidAnswer = true, indexA = 0, indexQ = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty description of Answer ${indexA + 1} at Question ${indexQ + 1}`);
            return;
        }
        //validate question 
        let isValidQuestion = true;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQ = i;
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty description for Question ${indexQ + 1}`);
            return;
        }
        //submit question
        for (let question of questions) {
            let questionCreated = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
            //submit answer
            for (let answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, +questionCreated.DT.id);
            }
        }
        toast.success(`Create Question and Answer success`);
        setQuestions(intitQuestions);
    }

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
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
                                            onChange={(event) => handleOnChangeQuestion('DESCRIPTION', question.id, event)}
                                        />
                                        <label >Question {index + 1} 's description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-upload' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type='file'
                                            hidden
                                            onChange={(event) => handleOnChangeQuestion('FILE', question.id, event)}
                                        />
                                        <span>
                                            {question.imageName
                                                ? <span
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleChangeImagePreview(question.id)}>
                                                    {question.imageName}
                                                </span>
                                                : '0 file is uploaded'}
                                        </span>
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
                                                    onChange={(event) => handleOnChangeAnswer('CHECKBOX', question.id, answer.id, event)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='name@example.com'
                                                        value={answer.description}
                                                        onChange={(event) => handleOnChangeAnswer('INPUT', question.id, answer.id, event)}
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
                                {
                                    isPreviewImage === true &&
                                    <Lightbox
                                        image={URL.createObjectURL(imagePreview.url)}
                                        title={imagePreview.title}
                                        onClose={() => setIsPreviewImage(false)}>
                                    </Lightbox>
                                }
                            </div>
                        )
                    })
                }

                {questions && questions.length > 0 &&
                    <div>
                        <button onClick={() => handleSubmitQuestionForQUiz()} className='btn btn-warning'>Save Questions</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default QuizQA;