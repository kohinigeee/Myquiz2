import { Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { QuizGenreEnum, QuizTypeEnum, quizGenreDic, quizTypeDic } from "@/lib/quizenum";
import SimpleQuizForm from "../forms/simplequizform";

import styles from "../../styles/composite/Createquizform/createquizform.module.css"
const makeQuizForm = ( type : QuizTypeEnum, genre : QuizGenreEnum ) => {

    switch( type ) {
        case QuizTypeEnum.Simple:
            return (<SimpleQuizForm quizGenreEnum={genre}/>)
        default:
            return (<></>)
    }
}

interface CreateQuizFormProps {

};

const CreateQuizForm: React.FC<CreateQuizFormProps> = (props: CreateQuizFormProps) => {
    
    const [quizTypeState, setQuizTypeState] = useState(QuizTypeEnum.Simple)
    const [quizGenreState, setQuizGenreState] = useState(QuizGenreEnum.Science)


    return (
        <>
            <div>
                <div>
                    <h2 className={`${styles.title}`}>New Question</h2>
                </div>

                <div id="optionsDiv" className="animate__animated animate__flipInX">
                    <h4 className={`${styles.div_title}`}>Options</h4>
                    <div id="optionsContainer" className={`${styles.options_container}`}>
                        <Form>
                            <Form.Group controlId="options-form">
                                <Row className={`${styles.options_row}`}>
                                    <Col md={3} className={`${styles.options_label_col}`}>
                                    <Form.Label className={`${styles.options_label}`}>Type</Form.Label>
                                    </Col>
                                    <Col md={9}>
                                    <Form.Select size="lg" className={`${styles.options_selector}`} onChange={(e) => setQuizTypeState(parseInt(e.target.value))}>
                                        {
                                            Array.from(quizTypeDic.entries()).map( ([key, value]) => (
                                                <option value={key} key={key}>{value.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center">
                                <hr className={`${styles.options_hr}`}></hr>
                                </div>
                                <Row className={`${styles.options_row}`}>
                                    <Col md={3} className={`${styles.options_label_col}`}>
                                    <Form.Label className={`${styles.options_label}`}>Genre</Form.Label>
                                    </Col>
                                    <Col md={9}>
                                    <Form.Select size="lg" className={`${styles.options_selector}`} onChange={(e) => setQuizGenreState(parseInt(e.target.value
                                        ))}>
                                        {
                                            Array.from(quizGenreDic.entries()).map( ([key, value]) => (
                                                <option value={key} key={key}>{value.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>

                    </div>
                </div>

                <div id="contentDiv">
                    <h4 className={`${styles.div_title}`}>Content</h4>
                    { makeQuizForm(quizTypeState, quizGenreState) }
                    
                </div>
            </div>
        </>
    )
}

export default CreateQuizForm;