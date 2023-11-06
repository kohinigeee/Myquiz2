import { Card, Col, Container, Form, Row, Tab, TabPane, Tabs } from "react-bootstrap"

import styles from "@/styles/composite/quizlistselectortab/quizlistselectortab.module.css"
import { ChangeEvent, useEffect, useState } from "react"
import { create } from "domain"
import { quizGenreDic, quizTypeDic } from "@/lib/quizenum"
import MyButton from "../parts/mybutton"
import { Quiz } from "@/lib/quiz"
import querystring from "querystring"
import axios from "axios"
import { quizSearchAPIURL } from "@/lib/constants"
import { makeCORSRequest } from "@/lib/axioshelper"
import { convertJsonToSimpleQuiz } from "@/lib/simpleQuizType"

interface QuizListSelecorTabProp {
    onGameStartCategory? : (quizList : Quiz[] ) => void;
}

const active_tab_style: React.CSSProperties = {
    background: "#b94047"
}

const non_active_tab_style: React.CSSProperties = {
    background: "aqua",
}

const filterChangeEvent = (ev: MouseEvent): void => {
    const ele = ev.target as HTMLButtonElement;
    ele.style.filter = "brightness(0.8)"
}

const filterNoneEvent = (ev: MouseEvent): void => {
    const ele = ev.target as HTMLButtonElement;
    ele.style.filter = "none";
}

const applyActiveStyle = (ele: HTMLButtonElement) => {
    ele.style.background = "#b94047";
    ele.style.color = "white"
    ele.style.filter = "none";
    ele.style.fontWeight = "bold"
    ele.style.border = "1px solid rgba(0,0,0,0.5)";
    ele.style.borderBottom = "#b94047 1px solid";

    ele.removeEventListener("mouseover", filterChangeEvent);
    ele.removeEventListener("mouseout", filterNoneEvent);
}


const applyInActiveStyle = (ele: HTMLButtonElement) => {
    ele.style.background = "white";
    ele.style.color = "#b94047"
    ele.style.fontWeight = "bold"
    ele.style.border = "1px solid rgba(0,0,0,0.5)";
    ele.style.borderBottom = "1px solid black"

    ele.addEventListener("mouseover", filterChangeEvent)
    ele.addEventListener("mouseout", filterNoneEvent);
}

interface TabProp {
    eventKey: string
    id: string
}

const QuizListSelecorTab: React.FC<QuizListSelecorTabProp> = (prop) => {

    const tabsId = "my_tabs_id";
    const tabProps: TabProp[] = [
        { eventKey: "categories", id: "my_tab_categories" },
        { eventKey: "list", id: "my_tab_list" },
    ]

    const createEleId = (index: number): string => {
        const eleId = `${tabsId}-tab-${tabProps[index].eventKey}`
        return eleId;
    }

    const [activeId, setActiveId] = useState<string>(createEleId(0));

    const changeTabStyes = () => {
        tabProps.forEach((item, index) => {
            const eleId = createEleId(index);
            const ele: HTMLButtonElement = document.getElementById(eleId) as HTMLButtonElement;

            if (activeId === ele.id) {
                applyActiveStyle(ele);
            } else {
                applyInActiveStyle(ele);
            }
        })
    }

    useEffect(() => {
        tabProps.forEach((item, index) => {
            const eleId = createEleId(index);
            const ele: HTMLButtonElement = document.getElementById(eleId) as HTMLButtonElement;

            const onClick = (e: any) => {
                const id = e.target.id;
                setActiveId(id);
            }
            ele.addEventListener("click", onClick);
        })
    }, [])

    useEffect(() => {
        changeTabStyes();
    }, [activeId])


    const createCheckBox = (labelValue: string, key : number) => {
        return (
            <div key={key} className={`${styles.checkbox_div} d-flex align-items-center`}>
                <input type="checkbox" className={`${styles.checkbox}`}></input>
                <label className={`${styles.checkbox_label}`}>
                    {labelValue}
                </label>
            </div>
        )
    }

    const onGameStartCategory = (e : any ) => {

        const param = {
            "offset": 0,
            "limit": 100,
        }

        const queryString = querystring.stringify(param)
        axios.get(quizSearchAPIURL + "?" + queryString, makeCORSRequest({}))
            .then((res) => {
                const result = res.data.data;
                console.log(result);
                const quizArrayJson: any[] = result.data
                const quizArray = quizArrayJson.map(convertJsonToSimpleQuiz)
                
                const quizList : Quiz[] = []
                quizArray.forEach((item) => {
                    if ( item ) quizList.push(item)
                })

                if ( prop.onGameStartCategory ) {
                    prop.onGameStartCategory(quizList);
                }
            })
            .catch((error) => {
                console.error(error.response);
            })
    }

    return (
        <>
            <div className={`${styles.my_tabs_container}`}>
                <Tabs id={tabsId} className={`${styles.active_tab}`}>
                    <Tab id={tabProps[0].id} eventKey={tabProps[0].eventKey} title="Category">
                        <div className={`${styles.tmp_div}`}>

                            <Row className="pt-3 pl-3 pr-3 d-flex justify-content-center">
                                <Col xs={10} lg={6}>
                                    <Card className={`${styles.category_card}`}>
                                        <Card.Body className={`${styles.category_type_body}`}>

                                            <Row>
                                                <Col xs={6}>
                                                    <Card.Title className={`${styles.category_type_title}`}>Quiz Type</Card.Title>
                                                </Col>
                                                <Col xs={6}>
                                                    <Card.Title className={`${styles.category_type_title}`}>Quiz Genre</Card.Title>
                                                </Col>
                                            </Row>

                                            <div className={`${styles.inner_div1}`}>
                                                <Row>
                                                    <Col xs={6} className={`${styles.inner_col_left}`}>
                                                        <div className={`${styles.type_are_row}`}>
                                                            {
                                                                Array.from(quizTypeDic.entries()).map(([typeEnum, type], index) => {
                                                                    return createCheckBox(type.name, index);
                                                                })
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col xs={6} className={`${styles.tmp_col}`}>
                                                        <div className={`${styles.type_are_row}`}>
                                                            {
                                                                Array.from(quizGenreDic.entries()).map(([typeEnum, type], index) => {
                                                                    return createCheckBox(type.name, index);
                                                                })
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <div className={`${styles.category_bottom_div}`}>
                                <Row className="d-flex justify-content-center">
                                    <Col xs={10} lg={6}  className="d-flex justify-content-end">
                                        <MyButton text="ゲーム開始" onClick={onGameStartCategory}></MyButton>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Tab>
                    <Tab id={tabProps[1].id} eventKey={tabProps[1].eventKey} title="List">
                        <div className={`${styles.tmp_div}`}>
                            <h3>List</h3>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default QuizListSelecorTab