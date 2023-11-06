import Layout from "@/component/layout"
import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useSelector } from "@/store/store"
import querystring from "querystring"
import axios from "axios"
import { quizSearchAPIURL } from "@/lib/constants"
import { makeCORSRequest } from "@/lib/axioshelper"
import { SimpleQuiz, convertJsonToSimpleQuiz } from "@/lib/simpleQuizType"
import SimpleQuizCard from "@/component/quizcard/simplequizcard"
import ReactPaginate from "react-paginate"

import styles from "@/styles/pages/managequizpage/managequizpage.module.css"

export default function Home() {

    const initialPageNo = 0;
    const queryLimit = 6;

    const [quizList, setQuizList] = useState<(SimpleQuiz | undefined)[]>([])
    const [pageNo, setPageNo] = useState<number>(initialPageNo)
    const [totalItemCounts, setTotalItemCounts] = useState<number>(0)
    const animationDuration = 0.05;
    const user = useSelector(state => state.loginUser.user)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const setCounts = (): Boolean => {
        const param = {
            mode: "count"
        }

        const queryString = querystring.stringify(param)
        axios.get(quizSearchAPIURL + "?" + queryString, makeCORSRequest({}))
            .then((res) => {
                const result = res.data;
                const counts = result.data.count;
                setTotalItemCounts(counts)
            })
            .catch((error) => {
                console.error(error);
                return false
            })

        return true
    }

    useEffect(() => {

        if (setCounts() === false) return

        const param = {
            "offset": pageNo * queryLimit,
            "limit": queryLimit,
        }

        const queryString = querystring.stringify(param)
        axios.get(quizSearchAPIURL + "?" + queryString, makeCORSRequest({}))
            .then((res) => {
                const result = res.data.data;
                const quizArrayJson: any[] = result.data
                const quizArray = quizArrayJson.map(convertJsonToSimpleQuiz)

                setQuizList([...quizArray])
            })
            .catch((error) => {
                console.error(error.response);
            })

        window.addEventListener("load", () => {
            document.body.style.overflow = "hidden"
        })
    }, [pageNo])

    const createAnimationDelayStyle = (delay_s: string) => {
        const ans: React.CSSProperties = {
            animationDelay: delay_s + "s"
        };
        return ans;
    }

    const tmpStyle: React.CSSProperties = {
        background: "#b94047"
    }

    const onChagePage = ({ ...selectedPage }) => {
        setPageNo(selectedPage.selected)
        scrollToTop();
    }

    return (
        <>
            <Layout title="クイズ管理">
                <div className="d-flex justify-content-center">
                    <div className={`${styles.container}`} >
                        <Row className="justify-content-center">
                            <Col>
                                <div className={`${styles.infos_container}`}>
                                    <div id="left-content">
                                        <h2 className={`${styles.page_title}`}>Your Quiz</h2>
                                    </div>

                                    <div id="right-content" className="d-flex justify-content-end align-items-end">
                                        <p className={`${styles.info_text}`}>Total Quiz : {totalItemCounts}</p>
                                        <p className={`${styles.info_text}`}>Total Page : {Math.floor(totalItemCounts/queryLimit)+1}</p>
                                    </div>
                                </div>

                                <div className={`${styles.card_container}`}>
                                    <Row>
                                        {
                                            quizList.map((quiz, index) => {
                                                const delay = (`${index * animationDuration}`)
                                                const cardNo = pageNo * queryLimit + index + 1;
                                                return (
                                                    <Col key={quiz?.quizId} style={createAnimationDelayStyle(delay)} ms={12} md={6} xl={4} className={`${styles.card_col} animate__animated animate__fadeInUpBig`}>
                                                        <div className={`${styles.card_internal_div}`}>
                                                            <SimpleQuizCard cardNo={cardNo} quiz_prop={quiz} />
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <ReactPaginate
                                        pageCount={totalItemCounts / queryLimit}
                                        marginPagesDisplayed={0}
                                        pageRangeDisplayed={3}
                                        containerClassName={`${styles.pagination_container}`}
                                        pageClassName={`${styles.pagination_item}`}
                                        nextClassName={`${styles.pagination_next}`}
                                        nextLabel={<span className={`${styles.pagination_next_label}`}>&gt;</span>}
                                        nextLinkClassName={`${styles.pagination_next_link}`}
                                        previousLabel={<span className={`${styles.pagination_previous_label}`}>&lt;</span>}
                                        previousClassName={`${styles.pagination_previous}`}
                                        previousLinkClassName={`${styles.pagination_previous_link}`}
                                        breakClassName={`${styles.pagination_break}`}
                                        activeClassName={`${styles.pagination_item_active}`}
                                        initialPage={initialPageNo}
                                        onPageChange={onChagePage}
                                    />
                                </div>
                            </Col>

                        </Row>
                    </div>
                </div>
            </Layout>
        </>
    )
}