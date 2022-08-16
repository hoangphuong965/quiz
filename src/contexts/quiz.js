import React, { createContext, useReducer } from 'react';
import { normalizeQuestions, shuffleAnswers } from '../helper';

const initialState = {
    currentQuestionIndex: 0,
    questions: [],
    showResults: false,
    answers: [],
    currrentAnswer: "",
    correctAnswersCount: 0
}

const reducer = (state, action) => {
    /*
        console.log("reducer", state, action);
        state: {currentQuestionIndex: 0, questions: [],....}
        action: {type: 'NEXT_QUESTION'}
    */

    switch (action.type) {

        case "SELECT_ANSWER": {
            const correctAnswersCount = action.payload === state.questions[state.currentQuestionIndex].correctAnswer
            ? state.correctAnswersCount + 1
            : state.correctAnswersCount;

            return {
                ...state,
                currrentAnswer: action.payload,
                correctAnswersCount,
            }
        }

        case "NEXT_QUESTION": {
            const showResults = state.currentQuestionIndex === state.questions.length - 1;
            
            const currentQuestionIndex = showResults 
                ? state.currentQuestionIndex 
                : state.currentQuestionIndex + 1;

            const answers = showResults 
            ? []
            : shuffleAnswers(state.questions[currentQuestionIndex]);     
            
            return  {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currrentAnswer: ""
            }
        }

        case "RESTART": {
            return initialState;
        }

        // case "LOADED_QUESTIONS": {
        //     const normalizedQuestions = normalizeQuestions(action.payload);

        //     return {
        //         ...state,
        //         questions: action.payload,
        //         answers: shuffleAnswers(normalizedQuestions[0])
        //     }
        // }

        case "LOADED_QUESTIONS": {
            const normalizedQuestions = normalizeQuestions(action.payload);
            return {
              ...state,
              questions: normalizedQuestions,
              answers: shuffleAnswers(normalizedQuestions[0]),
            };
        }

        default: {
            return state;
        }
            
    }

}


export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);
    return <QuizContext.Provider value={value} >{children}</QuizContext.Provider>;
};