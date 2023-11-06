import { Modal, Form,} from "react-bootstrap"
import React, { useState,useContext } from "react"
import MyButton from "../parts/mybutton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BACK_INDEX } from "@/lib/constants";
import axios from "axios";
import { makeCORSRequest, makeFormDataFromObj } from "@/lib/axioshelper";
import MyFormAlertMessage from "../parts/myfomralertmessage";

import { useSelector } from "@/store/store";

import styles from "../../styles/composite/accountcreatemodal/AccountCreateModal.module.css";

interface AccountCreateModalProps {
    show : boolean,
    onHide : () => void,
}

const formSchema = yup.object().shape({
    username: yup.string().required("ユーザー名は必須です"),
    password: yup.string().required("パスワードは必須です"),
})

const AccountCreateModal : React.FC<AccountCreateModalProps> = (props: AccountCreateModalProps ) => {


    const user = useSelector((state) => state.loginUser.user); 

    const [isShowLoginFailedMessage, setShowLoginFailedMessage] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: formData,
    });


    const onSubmit = (data: any) => {
        const url = BACK_INDEX + `/api/login`
        const fdata = makeFormDataFromObj(data);

        axios.post(url, fdata, makeCORSRequest({}))
            .then((response) => {
                console.log(response.data);
                alert("アカウントが作成できました\nログインしてください")
                props.onHide();
            })
            .catch((error) => {
                setShowLoginFailedMessage(true);
                console.error(error)
            })
    }

    return (
        <>
            <Modal className={`${styles.login_modal}`} show={props.show} onHide={props.onHide}>
                <div className={`${styles.modal_contents}`}>
                    <Modal.Header className={`${styles.modal_header}`}>
                        <Modal.Title className="mytext-secondary">Sign Up</Modal.Title>
                        {isShowLoginFailedMessage &&
                            <div>
                                <small className="mytext-secondary">アカウントの作成に失敗しました</small>
                                <br></br>
                                <small className="mytext-secondary">このUsernameは使用されています</small>
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
                        <div className="d-flex justify-content-left flex-fill align-items-center">
                        </div>
                        <MyButton onClick={props.onHide} text="Close" />
                        <MyButton type="submit" text="Sign up" form="__loginform" />
                    </Modal.Footer>
                </div>
            </Modal>

        </>

    )
}

export default AccountCreateModal;