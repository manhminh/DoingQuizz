import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { getDataQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss"
import _ from "lodash";
import Question from "./Question";

const DetailQuiz = (props) => {
    const param = useParams();
    const location = useLocation();
    console.log('location: ', location);
    const quizId = param.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
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
                        answers.push(item.answers);
                    })
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

    console.log('check dataquiz: ', dataQuiz);
    return (
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
                    <button className="btn btn-warning" onClick={() => handleNext()}>Finish</button>
                </div>
            </div>

            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz