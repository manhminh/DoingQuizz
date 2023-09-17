import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { toast } from 'react-toastify';
import { postRegister } from "../../services/apiServices";
import { useTranslation, Trans } from 'react-i18next';
import Languages from "../Header/Languages";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
        //submit api
        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        } else {
            toast.error(data.EM)
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <span>{t("register.title1")}</span>
                <button className="logIn-btn" onClick={() => navigate('/login')}>{t("register.login")}</button>
                <Languages />
            </div>

            <div className="title col-4 mx-auto">
                Typeform
            </div>

            <div className="welcome col-4 mx-auto">
                {t("register.title2")}
            </div>

            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>{t("register.username")}</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email (*)</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group form-email">
                    <label>{t("register.password")} (*)</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                </div>

                <div>
                    <button
                        className="btn-submit"
                        onClick={() => hanldeLogin()}
                    >
                        {t("register.register-btn")}
                    </button>
                </div>

                <div className="text-center">
                    <span className="back" onClick={() => navigate('/')}>&lt;&lt; {t("register.homepage")}</span>
                </div>
            </div>
        </div>
    )
}

export default Register;