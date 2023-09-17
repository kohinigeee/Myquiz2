import { BACK_INDEX } from "@/lib/constants"
import axios from "axios"
import Head from "next/head"
import { Container, Row, Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import FormData from 'form-data'
import { makeAxiosFormDataRequest, makeCORSRequest } from "@/lib/axioshelper"
import { useRef, useContext, useEffect} from "react"
import { DataContext } from "@/lib/UserContext"
import Link from "next/link"
import { convertJsonToUser } from "@/lib/userdata"
import Layout from "@/component/layout"

export default function Home() {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const formRef = useRef<HTMLFormElement | null>(null)

    const onCreate = (data: any) => {
        // const url = BACK_INDEX+"/api/login"+`?username=${username}&password=${password}`
        const url = BACK_INDEX+"/api/login"
        const form= new FormData()

        console.log("url:", url)
        form.append("username", username)
        form.append("password", password)

        axios.post(url, form, makeAxiosFormDataRequest(form, {})
        )
        .then( res => {
            console.log(res.data)
        })
        .catch( error => {
            console.log("Error:")
            console.error(error)
            console.log(error.response)
        })
    }

    const onLogin = () => {
        const url = BACK_INDEX+"/api/login"
        if ( formRef.current ) {
            const formData = new FormData(formRef.current)

            axios.put(url, formData, makeAxiosFormDataRequest(formData, {}))
            .then( res => {
                const userJson = res.data.data;
                const tmpuser = convertJsonToUser(userJson)
                setUser(convertJsonToUser(userJson))
                console.log("ログインに成功しました : ", tmpuser)
            })
            .catch( error => {
                console.log(error.response)
            })
        }
    }

    const onGet = () => {
        const url = BACK_INDEX+"/api/login"
        axios.get(url, makeCORSRequest({}))
        .then( res => {
            console.log(res.data)
        })
        .catch( error => {
            console.log(error.response)
        })
    }

    const onLogout = () => {
        const url = BACK_INDEX+"/api/logout"
        axios.delete(url, makeCORSRequest({}))
        .then( res => {
            console.log(res.data);
            window.location.reload();
        })
        .catch( error => {
            console.log(error.response);
        })
    }

    const usernameRegists = register("username", {
        required: {
            value: true,
            message: "入力が必須の項目です"
        }
    })
    const passwordRegists = register("password", {
        required: {
            value: true,
            message: "入力が必須の項目です",
        }
    })

    const username = watch("username")
    const password = watch("password")

    const { user, setUser } = useContext(DataContext)

    return (
        <>
        <Layout title="TestLogin">
            <Container className="" >
                <Row className="w-100">
                    <h1 className="text-center">React Login Test Page</h1>
                    <Form ref={formRef} id = "loginform">
                        <Form.Group> 
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="username" {...usernameRegists} />
                            {errors.username && <p>必須の項目です</p>}
                        </Form.Group>

                        <Form.Group className="mt-5"> 
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="password" {...passwordRegists} />
                            {errors.password && <p>必須の項目です</p>}
                        </Form.Group>

                        <div className="mt-5">
                            <Button onClick={onLogin}>Login</Button>
                            <Button onClick={onCreate}>Create</Button>
                            <Button onClick={onGet}>Get</Button>
                            <Button onClick={onLogout}>Logout</Button>
                        </div>
                    </Form>
                    <Link href="/tests/simplequiz"> move to simplequiz page
                    </Link>

                </Row>
            </Container>
        </Layout>
        </>
    )
}