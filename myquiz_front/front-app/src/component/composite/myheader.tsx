import { Navbar, Nav, Button, Container, NavDropdown, ToggleButton, ButtonGroup } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { User, isLogin } from "@/lib/userdata";
import MyButton from "../parts/mybutton";
import LoginModal from "./loginmodal";
import Link from "next/link";

import styles from "../../styles/composite/Myheader/Myheader.module.css";
import { useSelector } from "@/store/store";

export enum MyHeaderMenuName {
    Home = "",
    QuizManager = "managequizpage",
    CreateQuiz = "createquizpage"
}

interface MyHeaderProps {
    className?: string;
}

const MyHeader: React.FC<MyHeaderProps> = ({ className }) => {
    const user: undefined | User = useSelector((state) => state.loginUser.user);
    const [isLoginFlag, setIsLogin] = useState<boolean | null>(null)
    const [activeMenu, setActiveMenu] = useState<string>(MyHeaderMenuName.Home)

    const getMenuClassName = (menu: MyHeaderMenuName): string => {
        if (menu === activeMenu ) return `${styles.nav_menu_active}`
        else return `${styles.nav_menu}`
    }

    useEffect(() => {
        const currentPageUrl = window.location.href;
        const pageName = currentPageUrl.split('/').slice(-1)[0]
        setActiveMenu(pageName);
    }, [])

    useEffect(() => {
        //ログインボタンがちらつくのを抑制するため
        if (user === undefined) return;
        setIsLogin(isLogin(user))
    }, [user]);

    return (
        <Navbar className={`mybg-primary ${styles.nav} ${className}`}>
            <Container>
                <Nav.Link href="#image">
                    <img
                        src="/ico/brand_128.jpeg"
                        width="60"
                        height="60"
                        alt="Brand Image"
                        className=""
                    />
                </Nav.Link>
                <Navbar.Brand className={`mytext-primary ${styles.brand_text}`}> MyQuiz </Navbar.Brand>
                <Nav className="ml-5 text">
                    <Link id="id" legacyBehavior href="/"><a className={`nav-link ${getMenuClassName(MyHeaderMenuName.Home)}`}>ホーム</a></Link>
                    <Link id="id" legacyBehavior href={`/${MyHeaderMenuName.QuizManager}`}><a className={`nav-link ${getMenuClassName(MyHeaderMenuName.QuizManager)}`}>クイズ管理</a></Link>
                    <Link id="id" legacyBehavior href="/createquizpage"><a className={`nav-link ${getMenuClassName(MyHeaderMenuName.CreateQuiz)}`}>新規作成</a></Link>
                </Nav>
                <div className="flex-fill">
                </div>
                {
                    isLoginFlag === true &&
                    <NavDropdown title={user.nameid} className="mytext-primary" >
                        <NavDropdown.Item href="#logout">ログアウト</NavDropdown.Item>
                        <NavDropdown.Item href="#logout">アクション1</NavDropdown.Item>
                    </NavDropdown>
                }
                {
                    isLoginFlag === false &&
                    <>
                        <MyButton text="ログイン" id="loginbtn" />
                        <LoginModal target="loginbtn" />
                        {/* <MyButton text="Sign up" id="signupbtn"/> */}
                        {/* <AccountCreateModal target="signupbtn"/> */}
                    </>
                }
            </Container>
        </Navbar>
    );
};

export default MyHeader;