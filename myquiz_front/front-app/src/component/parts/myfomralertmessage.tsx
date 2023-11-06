import styles from "../../styles/parts/MyFormAlertMessage/MyFormAlertMessage.module.css";

interface MyFormAlertMessagePorps {
    text?: string,
}

const MyFormAlertMessage : React.FC<MyFormAlertMessagePorps> = ({text}) => {
    return (
        <div>
            <img src="/ico/alert_ico.png"/>
            <small className={`${styles.alert_text}`}>{text}</small>
        </div>
    )
}

export default MyFormAlertMessage;