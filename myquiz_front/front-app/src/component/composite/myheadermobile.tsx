import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { isLogin } from "@/lib/userdata";

import { useSelector } from "@/store/store";

import styles from "../../styles/composite/Myhadermobile/Myheadermobile.module.css"
import MyButton from "../parts/mybutton";

interface MyHeaderMobileProps {
    className?: string;
}

const MyHeaderMobile : React.FC<MyHeaderMobileProps> = ({className}) => {

    const user = useSelector( (state) => state.loginUser.user);

    const [isLoginFlag, setIsLogin] = useState<boolean>()

    useEffect(() => {
        setIsLogin(isLogin(user))
    }, [user]);

    return (
        <Navbar className={`mybg-primary ${styles.nav} ${className}`} expand="ml">
            <Nav.Link className="ml-5" href="#image">
                <img
                    src="/ico/brand_128.jpeg"
                    width="60"
                    height="60"
                    alt="Brand Image"
                    className=""
                />

            </Nav.Link>
            <Navbar.Brand className={`mytext-primary ${styles.brand_text}`}> MyQuiz </Navbar.Brand>
            <div className={`${styles.flex1}`}>
            </div>
            {
                isLoginFlag &&
                <NavDropdown title={user?.nameid} className="mytext-primary" >
                    <NavDropdown.Item href="#logout">ログアウト</NavDropdown.Item>
                    <NavDropdown.Item href="#logout">アクション1</NavDropdown.Item>
                </NavDropdown>
            }
            {
                (!isLoginFlag) &&
                <MyButton text="ログイン"></MyButton>
            }
            <div className={`${styles.flex2}`}>
            </div>

            <Navbar.Toggle className={`mr-5 ${styles.my_toggler}`} aria-controls="header-hunberger-menu" />
            <Navbar.Collapse id="header-hunberger-menu">
                <Nav className="d-flex flex-fill mr-auto">
                    <hr className="mt-2 mb-1"></hr>
                    <Nav.Link className={`${styles.toggler_menu}`} href="#home">Home</Nav.Link>
                    <hr className="mt-2 mb-1"></hr>
                    <Nav.Link className={`${styles.toggler_menu}`} href="#home">クイズ管理</Nav.Link>
                    <hr className="mt-2 mb-1"></hr>
                    <Nav.Link className={`${styles.toggler_menu}`} href="#home">新規作成</Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
};

export default MyHeaderMobile;