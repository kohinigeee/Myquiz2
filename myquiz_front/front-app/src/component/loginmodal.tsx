import { Modal, Form, Button } from "react-bootstrap"
import React, { useState, useRef, useEffect, useContext } from "react"
import MyButton from "./mybutton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BACK_INDEX } from "@/lib/constants";
import axios from "axios";
import { makeCORSRequest, makeFormDataFromObj } from "@/lib/axioshelper";
import { DataContext } from "@/lib/UserContext";
import { convertJsonToUser } from "@/lib/userdata";
import MyFormAlertMessage from "./parts/myfomralertmessage";

import styles from "../styles/parts/LoginModal/LoginModal.module.css"

interface LoginModalProps {
    target: string,
}

const formSchema = yup.object().shape({
    username: yup.string().required("ユーザー名は必須です"),
    password: yup.string().required("パスワードは必須です"),
})

const LoginModal: React.FC<LoginModalProps> = (props: LoginModalProps) => {

    const [show, setShow] = useState<boolean>(false);
    const [isShowLoginFailedMessage, setShowLoginFailedMessage] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const targetBtn = useRef<HTMLElement>();
    const { setUser } = useContext(DataContext);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: formData,
    });

    const setTarget = () => {
        if (typeof window !== "undefined") {
            const ele = document.getElementById(props.target);
            if (ele) {
                targetBtn.current = ele;
            }
        }
    }

    useEffect(() => {
        setTarget();
        if (targetBtn.current instanceof HTMLButtonElement) {
            targetBtn.current.addEventListener("click", handleOpen);
        }
    }, [targetBtn])

    const onSubmit = (data: any) => {
        const url = BACK_INDEX + `/api/login`
        const fdata = makeFormDataFromObj(data);

        axios.put(url, fdata, makeCORSRequest({}))
            .then((response) => {
                console.log(response.data);
                const data = response.data;
                const user = convertJsonToUser(data.data);
                if (user) {
                    setUser(user);
                }
                window.location.reload();
            })
            .catch((error) => {
                setShowLoginFailedMessage(true);
                console.error(error)
            })

    }

    setTarget();

    return (
        <>
            <Modal className={`${styles.login_modal}`} show={show} onHide={handleClose}>
                <div className={`${styles.modal_contents}`}>
                    <Modal.Header className={`${styles.modal_header}`}>
                        <Modal.Title className="mytext-primary">Login</Modal.Title>
                        {isShowLoginFailedMessage &&
                            <div>
                                <small className="mytext-primary">ログインに失敗しました</small>
                                <br></br>
                                <small className="mytext-primary">UsernameまたはPasswordが違います</small>
                            </div>
                        }
                    </Modal.Header>

                    <Modal.Body className={`${styles.modal_body}`}>
                        <Form id="__loginform" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Controller
                                    name="username" control={control} render={({ field }) => (
                                        <Form.Control {...field} type="text" placeholder="username" />
                                    )}
                                />
                                {(errors.username !== undefined) && (
                                    <MyFormAlertMessage text={errors.username?.message} />
                                )}
                            </Form.Group>

                            <Form.Group controlId="password" className="mt-4">
                                <Form.Label>Password</Form.Label>
                                <Controller
                                    name="password" control={control} render={({ field }) => (
                                        <Form.Control {...field} type="password" placeholder="password" />
                                    )}
                                />
                                {(errors.password !== undefined) && (
                                    <MyFormAlertMessage text={errors.password?.message} />
                                )}
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <MyButton onClick={handleClose} text="Close" />
                        <MyButton type="submit" text="Login" form="__loginform" />
                    </Modal.Footer>
                    </div>
            </Modal>

        </>

    )
}

export default LoginModal;