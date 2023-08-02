import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"
import { getDataQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss"
import _ from "lodash";

const DetailQuiz = (props) => {
    const param = useParams();
    const location = useLocation();
    console.log('location: ', location);
    const quizId = param.id;
    useEffect(() => {
        fetchQuestions(quizId);
    }, [quizId])

    const fetchQuestions = async (quizId) => {
        let res = await getDataQuiz(quizId);
        console.log('check question: ', res);
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
                        answers.push(item.answers);
                    })
                    return { quizId: key, data: answers, questionDescription, image }
                })
                .value()
            console.log('check data:', data);
        }
    }

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
                    <div className="question">
                        Question 1: how are you doing?
                    </div>
                    <div className="answer">
                        <div className="a-child">
                            A. abcxyz
                        </div>
                        <div className="a-child">
                            B. abcxyz
                        </div>
                        <div className="a-child">
                            C. abcxyz
                        </div>
                        <div className="a-child">
                            D. abcxyz
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>

            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz