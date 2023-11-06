import { SimpleQuiz } from "@/lib/simpleQuizType";
import { Button, Card, Col, Collapse, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/quizmode/simplequizgame/simlequizgame.module.css"
import QuizButton from "../parts/quizbutton";
import QuizResultText, { QuizResultTextState } from "./quizresulttext";
import { QuizResult } from "@/lib/quiz";

interface SimpleQuizGameProps {
    quiz?: SimpleQuiz
    onNext?: Function
    addResult? : (quiz: QuizResult) => void
    key? : Number
}

const SimpleQuizGame: React.FC<SimpleQuizGameProps> = (props) => {
    if (props.quiz === undefined) {
        return (<></>)
    }

    const quiz: SimpleQuiz = props.quiz;
    const commentaryClassName = (quiz.commentary !== "" ? `${styles.commentary_text_active}` : `${styles.commentary_text}`);
    const commentaryText = (quiz.commentary === "" ? "解説はありません" : quiz.commentary);

    const originText = quiz.problem

    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0);
    const displayInterval: number = 50;

    const [open, setOpen] = useState<boolean>(false)
    const [isAnswerd, setIsAnswerd] = useState<boolean>(false)

    const questionText = useRef<HTMLDivElement>(null)
    const answerInput = useRef<HTMLInputElement>(null)
    const nextDiv = useRef<HTMLDivElement>(null)

    useEffect(() => {

        //問題の表示開始
        //最初から問題文の全文の長さ分の行数が確保されるように
        if (questionText.current) {
            const ele = questionText.current;
            const height = ele.offsetHeight;
            ele.style.height = `${height}px`

            ele.style.color = "black";
            ele.textContent = displayText;
        }

        const timer = setInterval(() => {
            if (currentIndex < originText.length) {
                setDisplayText(originText.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            } else {
                clearInterval(timer);
            }
        }, displayInterval)

        return () => {
            clearInterval(timer);
        };
    }, [currentIndex, originText])

    const isCorrect = () : QuizResult => {
        const result : QuizResult = {
            result : false,
            inputAnswer : ""
        }

        if ( !answerInput.current ) return result;

        const ele = answerInput.current;
        const answer = ele.value;
        result.result = (answer === quiz.answer); 
        result.inputAnswer = answer;

        return result
    }

    const onAnswer = () => {
        console.log("onAnswer")

        setOpen(true);
        setIsAnswerd(true)
        if ( answerInput.current ) {
            answerInput.current.setAttribute("disabled", "true");
        }

        const result = isCorrect();
        if ( result.result ) setResultState(QuizResultTextState.Correct)
        else setResultState(QuizResultTextState.InCorrect);

        if ( nextDiv.current ) {
            nextDiv.current.style.visibility="visible";
        }
        
        if ( props.addResult ) {
            props.addResult(result);
        }
    }

    const [resultstate, setResultState] = useState<QuizResultTextState>(QuizResultTextState.NotAnswer);

    return (
        <>
            <div>
                <div className="d-flex justify-content-center">
                    <QuizResultText state={resultstate}></QuizResultText>
                </div>
                <div className={`mt-3 d-flex justify-content-end align-items-center ${styles.result_next}`}
                onClick={() => props.onNext && props.onNext()}
                ref={nextDiv}
                >
                    <img className={`${styles.result_next_ico}`} src="/ico/next_ico.svg"/>
                    <p className={`${styles.result_next_text}`}>Next</p>
                </div>

                <Card className={`mt-1 mb-5`}>
                    <Card.Body className={`${styles.question_card_body}`}>
                        <Card.Body className={`${styles.question_internal_card_body}`}>
                            <Card.Title className={`${styles.question_title_text}`}>Question</Card.Title>
                            <hr className={`${styles.title_hr}`}></hr>
                            <div className={`${styles.question_textarea}`} ref={questionText}>
                                {originText}
                            </div>
                        </Card.Body>

                        <Collapse in={open}>
                            <div className={"mt-2"} id="question_collapse">
                                <Card.Body className={`${styles.answer_internal_card_body}`}>
                                    <Card.Title className={`${styles.answer_title_text}`}>Answer</Card.Title>
                                    <hr className={`${styles.title_hr}`}></hr>
                                    <Card.Text className={`${styles.answer_text}`}>{quiz.answer}</Card.Text>
                                    <Card.Title className={`${styles.commentary_title}`}>解説</Card.Title>
                                    <hr className={`${styles.title_hr}`}></hr>
                                    <div className={commentaryClassName}>{commentaryText}</div>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card.Body>
                </Card>

                <Row>
                    <Col sm={9} className="mb-2">
                        <Card className={`${styles.my_answer_card}`}>
                            <Card.Body className={`${styles.my_answer_card_body}`}>
                                <Card.Body className={`${styles.my_answer_internal_card_body}`}>
                                    <Card.Title className={`${styles.my_answer_title}`}>Your Answer</Card.Title>
                                    <hr className={`${styles.title_hr}`}></hr>
                                    <input placeholder="回答欄" className={`${styles.my_answer_input}`} ref={answerInput}></input>
                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3} className={`d-flex justify-content-end align-content-end mb-2`}>
                        <div className="d-flex flex-column justify-content-end">
                            {isAnswerd ? (
                                <QuizButton text={"Next"} onClick={ () => props.onNext && props.onNext() }/>) :
                                <QuizButton text={"回答"} onClick={onAnswer} aria-controls="question_collapse" aria-expanded={open}/> 
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )

}

export default SimpleQuizGame;