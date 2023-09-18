import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss"
import _ from "lodash";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const DetailQuiz = (props) => {
    const param = useParams();
    const location = useLocation();
    const quizId = param.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModal, setDataModal] = useState({});

    useEffect(() => {
        fetchQuestions(quizId);
    }, [quizId])

    const fetchQuestions = async (quizId) => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (quizId), `data` is the array of objects
                .map((value, key) => {
                    let questionDescription, image = null;
                    let answers = [];
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers);
                    })
                    _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data);
        }
    }

    const handlePrev = () => {
        if (index - 1 >= 0)
            setIndex(index - 1);
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1);
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        console.log('check question: ', question);
        if (question && question.answers.length > 0) {
            question.answers = question.answers.map(item => {
                if (item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > - 1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinishQuiz = async () => {
        const payload = {
            quizId: quizId,
            answers: []
        }

        if (dataQuiz && dataQuiz.length > 0) {
            let answers = [];
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(answer => {
                    if (answer.isSelected) {
                        userAnswerId.push(answer.id)
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
                payload.answers = answers
            })
        }
        // submit api
        let res = await postSubmitQuiz(payload);
        if (res && res.EC === 0) {
            setIsSubmitQuiz(true);
            setDataModal({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setIsShowModalResult(true);

            //update DataQuiz with correct answer
            if (res.DT && res.DT.quizData) {
                let dataQuizClone = _.cloneDeep(dataQuiz);
                let a = res.DT.quizData;
                for (let q of a) {
                    for (let i = 0; i < dataQuizClone.length; i++) {
                        if (+q.questionId === +dataQuizClone[i].questionId) {
                            //update answer
                            let newAnswers = [];
                            for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id);
                                if (s) {
                                    dataQuizClone[i].answers[j].isCorrect = true;
                                }
                                newAnswers.push(dataQuizClone[i].answers[j]);
                            }
                            dataQuizClone[i].answers = newAnswers;
                        }
                    }
                }
                setDataQuiz(dataQuizClone);
            }
        } else {
            alert('Something is wrong...')
        }
    }
    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true);
    }

    return (
        <>
            <Breadcrumb className="quizdetail-new-header">
                <NavLink to='/' className="breadcrumb-item">
                    Home
                </NavLink>
                <NavLink to='/users' className="breadcrumb-item">
                    Users
                </NavLink>
                <Breadcrumb.Item active>
                    Quiz
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title">
                        {`Quiz ${quizId}: ${location?.state?.quizTitle}`}
                    </div>
                    <hr />
                    <div className="q-body">
                        <img />
                    </div>
                    <div className="q-content">
                        <Question
                            isSubmitQuiz={isSubmitQuiz}
                            isShowAnswer={isShowAnswer}
                            data={dataQuiz && dataQuiz.length > 0
                                ? dataQuiz[index]
                                : []
                            }
                            index={index}
                            handleCheckbox={handleCheckbox}
                        />
                    </div>
                    <div className="footer">
                        <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                        <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                        <button className="btn btn-warning" disabled={isSubmitQuiz} onClick={() => handleFinishQuiz()}>Finish</button>
                    </div>
                </div>

                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndex={setIndex}
                    />
                </div>

                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModal={dataModal}
                    handleShowAnswer={handleShowAnswer}
                />
            </div>
        </>
    )
}

export default DetailQuiz