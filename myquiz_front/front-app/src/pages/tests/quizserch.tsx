import { BACK_INDEX } from "@/lib/constants"
import axios from "axios"
import { Container, Row, Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { makeAxiosFormDataRequest, makeCORSRequest } from "@/lib/axioshelper"
import { useRef, useContext, useEffect, useState} from "react"
import Link from "next/link"
import Layout from "@/component/layout"

import querystring from "querystring"
import { useSelector } from "@/store/store"
import { User } from "@/lib/userdata"
import { convertJsonToSimpleQuiz } from "@/lib/simpleQuizType"

export default function Home() {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const formRef = useRef<HTMLFormElement | null>(null)

    const [quizs, setQuizs] = useState<any[]>([]);

    const onSearch = () => {
        const url = BACK_INDEX+"/api/quizsearch"

        const param = {
            "offset" : 0,
            "limit" : 100,
        }

        const queryString = querystring.stringify(param)

        axios.get(url+"?"+queryString, makeCORSRequest({}))
        .then( (res ) => {

            const quizdata : [] = res.data.data;
            quizdata.map(convertJsonToSimpleQuiz)
            setQuizs(quizdata);
        })
        .catch((error) => {
            console.error(error.response)
        })
    } 

    const user : undefined | User = useSelector((state) => state.loginUser.user)

    return (
        <>
        <Layout title="TestLogin">
            <Container className="" >
                <Row className="w-100">
                    <h1 className="text-center">React Login Test Page</h1>
                    <Form ref={formRef} id = "loginform">
                        <div className="mt-5">
                            <Button onClick={onSearch}>Search</Button>
                        </div>
                    </Form>
                    <Link href="/tests/login"> move to login page
                    </Link>
                    <Link href="/tests/simplequiz"> move to simplequiz page
                    </Link>
                </Row>

                <h3>Quizz</h3>
                <ul>{
                    quizs.map((item, index) => (
                        <li key={index}>
                            ID: {item.id}, Author: {item.authorId}, Problem: {item.problem}, created: {item.created}
                        </li>
                    ))
                    }
                </ul>
            </Container>
        </Layout>
        </>
    )
}