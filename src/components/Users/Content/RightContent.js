import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz, handleFinishQuiz, setIndex } = props;
    const refDiv = useRef([]);
    const onTimesUp = () => {
        handleFinishQuiz();
    }

    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(answer => answer.isSelected === true);
            if (isAnswered) {
                return 'question selected';
            }
        }
        return 'question';
    }

    const handleClickQuestion = (question, index) => {
        setIndex(index);
        console.log(refDiv.current);
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item.className === 'question clicked') {
                    item.className = 'question';
                }
            })
        }

        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(answer => answer.isSelected === true);
            if (isAnswered) {
                return;
            }
        }
        refDiv.current[index].className = 'question clicked';
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimesUp={onTimesUp}
                />
            </div>

            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((question, index) => {
                        return (
                            <div
                                key={`question-${index + 1}`}
                                className={getClassQuestion(question)}
                                onClick={() => handleClickQuestion(question, index)}
                                ref={element => refDiv.current[index] = element}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent;