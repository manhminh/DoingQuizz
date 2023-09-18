import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = (props) => {
    const { data, index, isShowAnswer } = props

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleHandleCheckbox = (e, aId, qId) => {
        props.handleCheckbox(aId, qId);
    }
    return (
        <>
            {data && data.image
                ? <div className="q-image" >
                    <img
                        style={{ cursor: 'pointer' }}
                        src={`data:image/jpeg;base64,${data.image}`}
                        onClick={() => setIsPreviewImage(true)}
                    />
                    {
                        isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={data.title}
                            onClose={() => setIsPreviewImage(false)}>
                        </Lightbox>
                    }
                </div>

                : <div className="q-image">
                </div>
            }
            <div className="question">
                Question {index + 1}: {data?.questionDescription}?
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, i) => {
                        return (
                            <div key={`answer-${i}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        id={`checkbox-${i}-${index}`}
                                        className="form-check-input"
                                        type="checkbox"
                                        disabled={props.isSubmitQuiz}
                                        checked={a.isSelected}
                                        onChange={(e) => handleHandleCheckbox(e, a.id, data.questionId)}
                                    />
                                    <label className="form-check-label" htmlFor={`checkbox-${i}-${index}`} >
                                        {a.description}
                                    </label>
                                    {isShowAnswer === true &&
                                        <>
                                            {a.isSelected === true && a.isCorrect === false
                                                && <IoIosClose className='incorrect' />
                                            }

                                            {a.isCorrect === true
                                                && <IoIosCheckmark className='correct' />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })
                }

            </div >
        </>
    )
}

export default Question;