import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useForm } from 'react-hook-form'
import Layout from '@/component/layout'
import SimpleQuizGame from '@/component/quizmode/simplequizgame'
import { useEffect, useState } from 'react'
import { SimpleQuiz } from '@/lib/simpleQuizType'
import querystring from "querystring";
import axios from 'axios'
import { quizSearchAPIURL } from '@/lib/constants'
import { makeCORSRequest } from '@/lib/axioshelper'
import { convertJsonToSimpleQuiz } from '@/lib/simpleQuizType'
import { Col, Container, Row } from 'react-bootstrap'
import { Quiz } from '@/lib/quiz'
import QuizManager from '@/component/quizmode/quizmanager'

export default function Home() {
    const [quiz, setQuiz] = useState<SimpleQuiz>();
    const [quizlist, setQuizList] = useState<Quiz[]>([]);

    useEffect(() => {
        const param = {
            "offset": 0,
            "limit": 10,
        }

        const queryString = querystring.stringify(param)
        axios.get(quizSearchAPIURL + "?" + queryString, makeCORSRequest({}))
            .then((res) => {
                const result = res.data.data;
                const quizArrayJson: any[] = result.data
                const quizArray = quizArrayJson.map(convertJsonToSimpleQuiz)
                
                const quizList : Quiz[] = []
                quizArray.forEach((item) => {
                    if ( item ) quizList.push(item)
                })
                setQuiz(quizArray[0])
                setQuizList(quizList)
            })
            .catch((error) => {
                console.error(error.response);
            })
    }, [])

    return (
        <>
            <Layout title='ホーム'>
                <Container>
                    <Row className='mt-5'>
                        <Col md={8}>
                            <QuizManager quizlist={quizlist}></QuizManager>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}
