import { Button } from "react-bootstrap";
import styled from "styled-components";
import style from "../styles/Mybutton/Mybutton.module.css"

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className? : string,
    text? : string,
    id? : string,
}

const MyButton : React.FC<MyButtonProps> = ( { className, text, id, ...rest} ) => {

    return(
        <Button className={`${className} ${style.my_btn}`} id={id} {...rest}>{text}
        </Button>
    );
}

export default MyButton;