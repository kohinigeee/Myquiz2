import styles from "@/styles/parts/QuizButton/quizbutton.module.css"
import React from "react"

interface QuizButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text? : string;
}

const QuizButton = React.forwardRef<HTMLButtonElement, QuizButtonProp>(( props, ref ) => {
    
    return (
        <button ref={ref} {...props } className={`${styles.quiz_btn} ${props.className}`}>
            {props.text}
        </button>
    )
})

export default QuizButton;