import { Quiz, QuizResult } from "@/lib/quiz";
import React, { useRef, useState } from "react";
import SimpleQuizGame from "./simplequizgame";
import { SimpleQuiz } from "@/lib/simpleQuizType";
import QuizHistory from "./quizresulthistory";
import QuizGameHistory from "./quizresulthistory";

interface QuizManagerProp {
    quizlist: Quiz[]
    onReturnHome : Function
}

const QuizManager: React.FC<QuizManagerProp> = (prop) => {
    if (prop.quizlist.length <= 0) return (<></>)

    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
    const [quizIndex, setQuizIndex] = useState<number>(0);

    const addResult = (newResult: QuizResult) => {
        const newResults = [...quizResults, newResult];
        setQuizResults(newResults);
    }

    const createQuizGame = (index: number) => {

        const quiz: SimpleQuiz = prop.quizlist[index] as SimpleQuiz;
        const onNext = () => {
            const nextIndex = quizIndex+1;
            setQuizIndex(nextIndex);
        }

        return (<SimpleQuizGame quiz={quiz} onNext={onNext} addResult={addResult} key={quizIndex}></SimpleQuizGame>)
    }

    const createQuizResult = () => {
        return(
            <QuizGameHistory quizlist={prop.quizlist} quizresults={quizResults} onReturnHome={prop.onReturnHome}></QuizGameHistory>
        )
    }

    const createQuizContent = (index : number ) => {
        if ( index >= prop.quizlist.length ) return createQuizResult();
        return createQuizGame(index);
    }

    return (
        <>
            <div>
                {createQuizContent(quizIndex)}
            </div>
        </>
    )
}

export default QuizManager;

