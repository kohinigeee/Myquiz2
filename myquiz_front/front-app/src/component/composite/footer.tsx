import styles from "../../styles/composite/Footer/Footer.module.css";

const Footer = () => {
    return (
        <div className={`${styles.footer_container}`}>
            <div className={`${styles.brand_container}`}>
                <img src="/ico/brand_128_white.png" width={40} height={40} />
                <h5 className={`${styles.brand_text}`}>MyQuiz</h5>
            </div>
            <small className="mytext-secondary m-0">©myquiz 2023</small>
        </div>

    )
}

export default Footer;
