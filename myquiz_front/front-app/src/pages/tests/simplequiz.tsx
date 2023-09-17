import { BACK_INDEX } from "@/lib/constants"
import axios from "axios"
import Head from "next/head"
import { Container, Row, Form, Button } from "react-bootstrap"
import { set, useForm } from "react-hook-form"
import FormData from 'form-data'
import { makeAxiosFormDataRequest, makeCORSRequest } from "@/lib/axioshelper"
import { useRef, useContext, useEffect } from "react"
import { DataContext } from "@/lib/UserContext"
import Link from "next/link"
import Layout from "@/component/layout"

export default function Home() {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const formRef = useRef<HTMLFormElement | null>(null)
    const url = BACK_INDEX + "/api/simplequiz"

    const onCreate = (data: any) => {
        const formData = new FormData()
        formData.append("id", user?.id);
        formData.append("problem", problem);
        formData.append("answer", answer);
        formData.append("genre", "science");

        axios.post(url, formData, makeAxiosFormDataRequest(formData, {}))
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.error(error.response)
            })
    }

    const problem = watch("problem")
    const answer = watch("answer")
    const usernameid = watch("usernameid")
    const id = watch("id")

    const { user } = useContext(DataContext)
    // console.log("user:", user)

    return (
        <>
            <Layout title="TestSimpleQuiz">
                <Container className="vh-100" >
                    <Row className="w-100">
                        <h1 className="text-center">React Login Test Page</h1>
                        <Form ref={formRef} id="loginform">
                            <Form.Group>
                                <Form.Label>Problem</Form.Label>
                                <Form.Control as="textarea" placeholder="問題文" rows={3} {...register("problem")} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Answer</Form.Label>
                                <Form.Control type="text" placeholder="解答" {...register("answer")}></Form.Control>
                            </Form.Group>

                            <Form.Group className="mt-5">
                                <Form.Label>UesrnameId</Form.Label>
                                <Form.Control type="text" placeholder="usernameId" {...register("usernameid")} />
                            </Form.Group>

                            <Form.Group className="mt-5">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="number" placeholder="Id" {...register("id")} />
                            </Form.Group>
                            <div className="mt-5">

                                <Button onClick={onCreate}>Create</Button>
                                <Button >Delete</Button>
                                <Button >Get</Button>
                            </div>
                        </Form>

                        <Link href="/tests/login"> move to login page
                        </Link>

                    </Row>
                </Container>
            </Layout>
        </>

    )
}