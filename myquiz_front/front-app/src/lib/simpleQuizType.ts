import { QuizGenre, QuizType, getQuizGenre, getQuizGenreEnum, getQuizType, getQuizTypeEnum } from "./quizenum";
import { Quiz } from "./quiz";

export interface SimpleQuiz extends Quiz {
    answer: string;
    problem : string;
    created : string;
    commentary : string;
}

const isCorrectJson = ( data : any ) : Boolean => {
    if ( typeof(data.id) !== "number") return false;
    if ( typeof(data.authorId) !== "number") return false;
    if ( typeof(data.answer) !== "string" ) return false;
    if ( typeof(data.problem) !== "string" ) return false;
    if ( typeof(data.created) !== "string" ) return false;
    if ( typeof(data.genreId) !== "number") return false;
    if ( typeof(data.typeId) !== "number") return false;
    return true;
}

export const convertJsonToSimpleQuiz = ( data : any ) : SimpleQuiz| undefined => {
    if ( isCorrectJson(data) === false ) return undefined;
    const quizGenreEnum = getQuizGenreEnum(data.genreId)
    const quizTypeEnum = getQuizTypeEnum(data.typeId)

    if ( quizGenreEnum === undefined ) return undefined;
    if ( quizTypeEnum === undefined ) return undefined;

    const quizGenreValue = getQuizGenre(quizGenreEnum);
    const quizTypeValue = getQuizType(quizTypeEnum);
    
    if ( quizGenreValue === undefined ) return undefined;
    if ( quizTypeValue === undefined ) return undefined;

    const simpleQuiz : SimpleQuiz = {
        quizId: data.id,
        authorId: data.authorId,
        answer: data.answer,
        problem : data.problem,
        commentary : data.commentary,
        created : data.created,
        quizGenre : quizGenreValue,
        quizType : quizTypeValue,
    };

    return simpleQuiz;
}
