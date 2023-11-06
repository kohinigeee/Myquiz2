import { QuizGenre, QuizGenreEnum, getQuizGenre } from "@/lib/quizenum";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Form, Card } from "react-bootstrap";
import { useSelector } from "@/store/store"
import axios from "axios";

import styles from "../../styles/forms/simplequizform/simplequizform.module.css";
import AutoResizeTextArea from "../parts/resizetextarea";
import { makeAxiosFormDataRequest, makeFormDataFromObj } from "@/lib/axioshelper";
import { BACK_INDEX, simpleQuizAPIURL } from "@/lib/constants";
import { convertJsonToSimpleQuiz } from "@/lib/simpleQuizType";
import MyButton from "../parts/mybutton";

interface SimpleQuizFormProps {
    quizGenreEnum: QuizGenreEnum
};

interface QuizFormData {
    userId: number;
    problem: string;
    answer: string;
    commentary: string;
    genreId: number | undefined;
}

const SimpleQuizForm: React.FC<SimpleQuizFormProps> = (props: SimpleQuizFormProps) => {

    let quizGenre: QuizGenre | undefined = getQuizGenre(props.quizGenreEnum)
    const user = useSelector(state => state.loginUser.user);

    useEffect(() => {
        quizGenre = getQuizGenre(props.quizGenreEnum)
    }, [props.quizGenreEnum])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuizFormData>();

    const onSubmit: SubmitHandler<QuizFormData> = (data) => {
        data.userId = user.id;
        data.genreId = quizGenre?.id;

        const formData = makeFormDataFromObj(data)
        const url = simpleQuizAPIURL

        axios.post(url, formData, makeAxiosFormDataRequest(formData, {}))
            .then(res => {
                const data = res.data.data;
                console.log(data)
                const quiz = convertJsonToSimpleQuiz(data);
                console.log("Quiz=", quiz);
            })
            .catch(error => {
                console.error(error.response);
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="contentContainer" className="animate__animated animate__flipInX">
                    <Card className={`${styles.content_card}`}>
                        <Card.Body className={`${styles.content_card_body}`}>
                            <Card.Body className={`${styles.form_card_body}`}>
                                <Card.Title className={`${styles.form_card_title}`}>Question</Card.Title>
                                <AutoResizeTextArea id="create_question_textarea" rows={3} placeholder={"問題文を入力してください"} className={`${styles.form_card_question_input}`} register={register(`problem`)}></AutoResizeTextArea>
                            </Card.Body>

                            <Card.Body className={`${styles.form_card_answer_body}`}>
                                <Card.Title className={`${styles.form_card_title}`}>Answer</Card.Title>
                                <AutoResizeTextArea id="create_answer_textarea" rows={1} placeholder={"答えを入力してください"} className={`${styles.form_card_question_input}`} register={register('answer')} ></AutoResizeTextArea>
                            </Card.Body>

                            <hr className={`${styles.form_hr}`}></hr>

                            <Card.Body className={`${styles.form_card_body}`}>
                                <Card.Title className={`${styles.form_card_commentary_title}`}>Commentary</Card.Title>
                                <AutoResizeTextArea id="create_commentary_textarea" rows={1} placeholder={"解説を入力してください"} className={`${styles.form_card_commentary_input}`} register={register('commentary')}></AutoResizeTextArea>
                            </Card.Body>
                        </Card.Body>
                    </Card>

                </div>
                    <div className="d-flex justify-content-end">
                        <MyButton type="submit" text={"Create"} className={`${styles.subit_btn}`}>Create</MyButton>
                    </div>
            </form>
        </div>
    )
}

export default SimpleQuizForm;