import { Navbar, Nav, Button, Container, NavDropdown, ToggleButton, ButtonGroup } from "react-bootstrap";
import styles from "../styles/Myheader/Myheader.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "@/lib/UserContext";
import { isLogin } from "@/lib/userdata";
import MyButton from "./mybutton";
import LoginModal from "./loginmodal";

interface MyHeaderProps {
    className?: string;
}


const MyHeader: React.FC<MyHeaderProps> = ({ className }) => {
    const { user } = useContext(DataContext)
    const [isLoginFlag, setIsLogin] = useState<boolean|null>(null)

    useEffect(() => {
        //ログインボタンがちらつくのを抑制するため
        if ( user === undefined ) return; 
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
                    <Nav.Link href="" className={`${styles.nav_menu_active}`}>Home</Nav.Link>
                    <Nav.Link href="" className={`${styles.nav_menu}`}>クイズ管理</Nav.Link>
                    <Nav.Link href="" className={`${styles.nav_menu}`}>新規作成</Nav.Link>
                </Nav>
                <div className="flex-fill">
                </div>
                {
                    isLoginFlag === true &&
                    <NavDropdown title={user?.nameid} className="mytext-primary" >
                        <NavDropdown.Item href="#logout">ログアウト</NavDropdown.Item>
                        <NavDropdown.Item href="#logout">アクション1</NavDropdown.Item>
                    </NavDropdown>
                }
                {
                    isLoginFlag === false &&
                    <>
                    <MyButton text="ログイン" id="loginbtn"/>
                    <LoginModal target="loginbtn"/>
                    </>
                }

            </Container>
        </Navbar>
    );
};

export default MyHeader;