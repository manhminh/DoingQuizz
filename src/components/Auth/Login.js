import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { postLogin } from "../../services/apiServices";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTranslation, Trans } from 'react-i18next';
import Languages from "../Header/Languages";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const hanldeLogin = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }

        if (!password) {
            toast.error('Invalid password')
            return;
        }
        setIsLoading(true);
        //submit api
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        } else {
            toast.error(data.EM)
            setIsLoading(false);
        }
    }

    const handleOnKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            hanldeLogin();
        }
    }

    return (
        <div className="login-container">
            <div className="header">
                <span>{t("login.title1")}</span>
                <button className="signUp-btn" onClick={() => navigate('/register')}>{t("login.signup")}</button>
                <Languages />
            </div>

            <div className="title col-4 mx-auto">
                Typeform
            </div>

            <div className="welcome col-4 mx-auto">
                {t("login.title2")}
            </div>

            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>{t("login.password")}</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => handleOnKeyDown(e)}
                    />
                </div>
                <span className="forgot-password">{t("login.forgot-password")}</span>
                <div>
                    <button
                        className="btn-submit"
                        onClick={() => hanldeLogin()}
                        disabled={isLoading}
                    >
                        {isLoading && <AiOutlineLoading3Quarters className="loader-icon" />}
                        <span>{t("login.login-btn")}</span>
                    </button>
                </div>

                <div className="text-center">
                    <span className="back" onClick={() => navigate('/')}>&lt;&lt; {t("login.homepage")}</span>
                </div>
            </div>
        </div>
    )
}

export default Login;