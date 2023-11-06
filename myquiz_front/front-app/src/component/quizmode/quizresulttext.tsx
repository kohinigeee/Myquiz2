import styles from "@/styles/quizmode/quizresulttext/quizresulttext.module.css"

export enum QuizResultTextState {
    NotAnswer,
    Correct,
    InCorrect,
}

interface QuizResultTextProps {
    state: QuizResultTextState
}

const QuizResultText: React.FC<QuizResultTextProps> = (props) => {

    const xmark_style: React.CSSProperties = {
        width: `48px`,
        height: `48px`
    }
    const circle_style: React.CSSProperties = {
        width: `40px`,
        height: `40px`
    }

    const makeElement = (state: QuizResultTextState) => {
        switch (state) {
            case QuizResultTextState.NotAnswer:
                return (
                    <div className={`d-flex ${styles.notanswer_container}`}>
                        <img src="/ico/circle_ico.svg" style={circle_style} />
                        <p className={`${styles.correct_text}`}>正解！</p>
                    </div>
                )
            case QuizResultTextState.Correct:
                return (
                    <div className={`d-flex align-items-center animate__animated animate__flash`}>
                        <img src="/ico/circle_ico.svg" style={circle_style} />
                        <p className={`${styles.correct_text}`}>正解！</p>
                    </div>
                )
            case QuizResultTextState.InCorrect:
                return (
                    <div className="d-flex algin-items-center animate__animated animate__swing">
                        <img src="/ico/xmark_ico.svg" style={xmark_style} />
                        <p className={`${styles.incorrect_text}`}>不正解！</p>
                    </div>
                )
        }
    }

    return (
        <>
            {makeElement(props.state)}
        </>
    )
}

export default QuizResultText;