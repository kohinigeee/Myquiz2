import { SimpleQuiz } from "@/lib/simpleQuizType";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

import styles from "@/styles/card/simplequizcard/simplequizcard.module.css"
import { QuizGenreEnum } from "@/lib/quizenum";

interface SimpleQuizCardProps {
    quiz_prop : SimpleQuiz | undefined
    cardNo? : number 
}

const getGenreString = ( quiz : SimpleQuiz ) : string => {
    switch ( quiz.quizGenre.genreEnum ) {
        case QuizGenreEnum.Science :
            return "science"
        case QuizGenreEnum.Literature :
            return "literature"
        case QuizGenreEnum.SocialStudy:
            return "socialstudy"
        case QuizGenreEnum.Music:
            return "music"
        case QuizGenreEnum.Sports:
            return "sports"
        case QuizGenreEnum.Entertainment:
            return "entertainment"
        case QuizGenreEnum.Subculture:
            return "subculture"
        case QuizGenreEnum.Lifestyle:
            return "lifestyle"
        case QuizGenreEnum.Nongenre:
            return "nongenre"
        default:
            return "";
    }
}

const SimpleQuizCard : React.FC<SimpleQuizCardProps> = ( props ) => {


    const [quizState, setQuizState] = useState<SimpleQuiz| undefined>(props.quiz_prop)
    if ( quizState === undefined ) return (<></>)

    const [genreString, setGenreString] = useState<String>("none")

    useEffect( () => {
        setGenreString(getGenreString(quizState))
    }, [quizState])

    return (
                <Card>
                    <Card.Body className={`${styles.quiz_card_body} ${ styles["background_"+genreString]}`}>

                        {
                            (props.cardNo !== undefined ) && (
                                <div><p className={`${styles.card_no_text}`}>No.{props.cardNo}</p></div>
                            )
                        } 
                        <Card.Body className={`${styles.values_card_question_body}`}>
                            <Card.Title className={`${styles.values_question_title} ${styles["font_color_"+genreString]}`}>Question</Card.Title>
                             <textarea readOnly={true} value={quizState.problem} rows={3} className={`${styles.values_question_textarea}`}/>
                        </Card.Body>

                        <Card.Body className={`${styles.values_card_answer_body}`}>
                            <Card.Title className={`${styles.values_answer_title} ${styles["font_color_"+genreString]}`}>Answer</Card.Title>
                             <textarea readOnly={true} value={quizState.answer} rows={1} className={`${styles.values_answer_textarea}`}/>
                        </Card.Body>
                    </Card.Body>
                </Card>
    )
}

export default SimpleQuizCard;