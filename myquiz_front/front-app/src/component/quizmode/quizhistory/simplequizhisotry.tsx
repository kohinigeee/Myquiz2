import { QuizResult } from "@/lib/quiz";
import { SimpleQuiz } from "@/lib/simpleQuizType";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";

import styles from "@/styles/quizmode/quizhistory/simplehistory/simplequizhistory.module.css"

interface SimpleQuizReusultHistoryProp {
    quiz: SimpleQuiz
    result: QuizResult
    no: number
}

const SimpleQuizReusultHistory: React.FC<SimpleQuizReusultHistoryProp> = (prop) => {
    const quiz = prop.quiz;
    const result = prop.result;

    const createCardResult = (result: boolean) => {
        if (result) {
            return (
                <div className={`${styles.card_result_div}`}>
                    <img src="/ico/circle_ico.svg" className={`${styles.card_circle_ico}`} />
                    <p className={`${styles.card_correct_text}`}>正解</p>
                </div>
            )
        } else {
            return (
                <div className={`${styles.card_result_div}`}>
                    <img src="/ico/xmark_ico.svg" className={`${styles.card_xmark_ico}`} />
                    <p className={`${styles.card_incorrect_text}`}>不正解</p>
                </div>
            )
        }
    }
    return (
        <>
            <Card className={`${styles.result_card}`}>
                <Card.Body className={`${styles.internal_body1}`}>
                    <div className="d-flex justify-content-between">
                        <p className={`${styles.card_no_text}`}>No.{prop.no}</p>

                        {createCardResult(prop.result.result)}
                    </div>
                </Card.Body>
                <Card.Body className={`${styles.result_internal_card}`}>
                    <Card.Body className={`${styles.result_question_card}`}>
                        <Card.Title className={`${styles.result_question_title}`}>Question</Card.Title>
                        <Card.Text>{quiz.problem}</Card.Text>
                    </Card.Body>

                    <Row className="mt-2 d-flex justify-content-between">
                        <Col sm={6} className="mb-2">
                            <Card.Body className={`${styles.result_answer_body}`}>
                                <Card.Title className={`${styles.result_question_title}`}>Answer</Card.Title>
                                <Card.Text>{quiz.answer}</Card.Text>
                            </Card.Body>
                        </Col>
                        <Col sm={6} className="mb-2">
                            <Card.Body className={`${styles.result_answer_body}`}>
                                <Card.Title className={`${styles.result_answer_title}`}>Your Answewr</Card.Title>
                                <Card.Text>{result.inputAnswer ? result.inputAnswer : "　"}</Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </>
    )
}

export default SimpleQuizReusultHistory;