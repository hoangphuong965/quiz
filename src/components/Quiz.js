import React, {useContext, useEffect} from 'react';
import { QuizContext } from '../contexts/quiz';
import Question from './Question';


const Quiz = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const apiURL = "https://opentdb.com/api.php?amount=10&encode=url3986";
    useEffect(() => {
        if(quizState.questions.length > 0) {
            return;
        }
        fetch(apiURL)
            .then((res) => res.json())
            .then((data) => {
                dispatch({type: 'LOADED_QUESTIONS', payload: data.results})
            })
    })

    return (
        <div className='quiz'>
            {quizState.showResults && (
                <div className='results'>
                    <div className='congratulations'>Congratulation</div>
                    <div className='results-info'>
                        <div>You have completed the quiz</div>
                        <div>You've got {quizState.correctAnswersCount} of {quizState.questions.length}</div>
                    </div>
                    <div className='next-button' onClick={()=>dispatch({type: "RESTART"})}>Restart</div>
                </div>
            )}
            {!quizState.showResults && quizState.questions.length > 0 &&(
                <div>
                    <div className='score'>
                        Question {quizState.currentQuestionIndex + 1}/{quizState.questions.length}
                    </div>
                    <Question />
                    <div className='next-button' onClick={()=>dispatch({type: "NEXT_QUESTION"})}>
                        Next question
                    </div>
                </div>
            )}
        </div>
    )
}

export default Quiz;