import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { postLogin } from "../../services/apiServices";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

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


    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button className="signUp-btn" onClick={() => navigate('/register')}>Sign up</button>
            </div>

            <div className="title col-4 mx-auto">
                Typeform
            </div>

            <div className="welcome col-4 mx-auto">
                Hello, who's this
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
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <span className="forgot-password">Forgot password?</span>
                <div>
                    <button
                        className="btn-submit"
                        onClick={() => hanldeLogin()}
                        disabled={isLoading}
                    >
                        {isLoading && <AiOutlineLoading3Quarters className="loader-icon" />}
                        <span>Login to Typeform</span>
                    </button>
                </div>

                <div className="text-center">
                    <span className="back" onClick={() => navigate('/')}>&lt;&lt; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;