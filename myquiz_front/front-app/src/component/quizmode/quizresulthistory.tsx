import { Quiz, QuizResult } from "@/lib/quiz";
import React, { useEffect, useState } from "react";
import styles from "@/styles/quizmode/quizresulthistory/quizresulthistory.module.css"
import { simpleQuizAPIURL } from "@/lib/constants";
import SimpleQuizReusultHistory from "./quizhistory/simplequizhisotry";
import { SimpleQuiz } from "@/lib/simpleQuizType";

const sleepms = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

interface QuizGameHistoryProp {
    quizlist: Quiz[]
    quizresults: QuizResult[]
    onReturnHome?: Function
}

const QuizGameHistory: React.FC<QuizGameHistoryProp> = (prop) => {
    if (prop.quizlist.length <= 0 || prop.quizresults.length <= 0) return (<></>)

    const animeTotalTime = 700;
    const quizNumber = prop.quizlist.length;
    const animationDuration = 50;

    const [correctPercent, setCorrectPercent] = useState<number>(0)

    const doCountUp = async (ms: number) => {
        const correctCnt = prop.quizresults.filter(item => item.result === true).length;

        const seitouritu: number = Math.floor(correctCnt / quizNumber * 100)
        const duratinTime: number = Math.floor(ms / seitouritu)
        console.log("正答率: ", seitouritu)

        for (let i = 1; i <= seitouritu; ++i) {
            await sleepms(duratinTime);
            setCorrectPercent(i)
        }
    }

    const createResultHistoryCard = (quiz: Quiz, index: number) => {
        const result = prop.quizresults[index];

        return (
            <SimpleQuizReusultHistory quiz={quiz as SimpleQuiz} result={result} no={index + 1} />
        )
    }

    const onReturnHome = ( e : any ) => {
        if ( prop.onReturnHome ) {
            prop.onReturnHome();
        }
    } 

    useEffect(() => {
        doCountUp(animeTotalTime);
    }, [])

    return (
        <>
            <div>
                <div className={`${styles.result_percent_div}`}>
                    <div className={`${styles.result_percent_div2}`}>
                        <p className={`${styles.result_percent_text1}`}>正答率</p>
                        <p className={`${styles.result_percent_text2}`}>{correctPercent}%</p>
                    </div>
                    <div className="justify-content-center d-flex flex-grow-1">
                        <div className="flex-grow-1 d-flex justify-content-center">
                            <hr className={`${styles.info_hr}`}></hr>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-center flex-grow-1">
                            <p className={`${styles.info_text}`}>セット名</p>
                        </div>
                        <div className="d-flex justify-content-center flex-grow-1">
                            <p className={`${styles.info_text}`}>制作者</p>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className={`${styles.result_div}`}>
                        <h3 className={`${styles.result_title}`}>Results</h3>

                        <div className={`${styles.return_home_div}`} onClick={onReturnHome}>
                            <p className={`${styles.return_home_p}`}>Return Home</p>
                            <img src="/ico/next_ico_white.svg" className={`${styles.return_home_ico}`}></img>
                        </div>

                    </div>
                    <div>
                        {
                            prop.quizlist.map((quiz, index) => {
                                const delayms = index * animationDuration;
                                const style: React.CSSProperties = {
                                    animationDelay: `${delayms}ms`
                                }

                                return (
                                    <div className="mb-3 animate__animated animate__fadeInRight" style={style}>
                                        {createResultHistoryCard(quiz, index)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizGameHistory;