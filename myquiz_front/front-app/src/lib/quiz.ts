import { QuizGenre, QuizType } from "./quizenum";

export interface Quiz {
    quizId : number;
    authorId: number;
    quizType : QuizType;
    quizGenre : QuizGenre;
    created : string;
}

export interface QuizResult {
    result : boolean;
    inputAnswer : string;
}