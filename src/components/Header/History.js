import { useState, useEffect } from "react";
import { getHistory } from '../../services/apiServices';
import "./History.scss";

const History = (props) => {
    const [history, setHistory] = useState({});

    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            setHistory(res.DT);
        }
    }
    return (
        <div className='history-container'>
            <div className="history-content">
                <span className="title">Quizzes Done:</span>
                <span className="value">
                    {history.data && history.data.length}
                </span>
            </div>

            <div className='detail-container'>
                {history.data && history.data.length > 0 &&
                    history.data.map((item, index) => {
                        return (
                            <div key={`question ${index + 1}`} className="detail-content">
                                <div className='child'>
                                    <span className="text">Quiz Name:</span>
                                    <span className="value">{item?.quizHistory?.name}</span>
                                </div>
                                <div className='child'>
                                    <span className="text">Total Questions:</span>
                                    <span className="value">{item?.total_questions}</span>
                                </div>
                                <div className='child'>
                                    <span className="text">Total Correct Answers:</span>
                                    <span className="value">{item?.total_correct}</span>
                                </div>
                                <div className='child'>
                                    <span className="text">Total Point:</span>
                                    <span className="value">{(+item?.total_correct / +item?.total_questions) * 10} / 10</span>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default History