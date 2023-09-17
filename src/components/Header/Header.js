import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { SiReactos } from 'react-icons/si';
import { useTranslation, Trans } from 'react-i18next';
import Languages from './Languages';
import Profile from './Profile';
import { useState } from 'react';

const Header = () => {
    const [isShowProfile, setIsShowProfile] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register')
    }
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    console.log('account', account);
    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token);
        console.log('>>>check res', res);
        if (res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }
    const { t } = useTranslation();

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">Minh Manh</Navbar.Brand> */}
                    <NavLink to="/" className='navbar-brand'>
                        <SiReactos className='brand-icon' />
                        Typeform
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>{t("header.home")}</NavLink>
                            <NavLink to="/users" className='nav-link'>{t("header.users")}</NavLink>
                            <NavLink to="/admin" className='nav-link'>{t("header.admin")}</NavLink>

                            {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link> */}
                        </Nav>

                        <Nav>
                            {
                                !isAuthenticated
                                    ? <>
                                        <button className='btn-login' onClick={() => handleLogin()}>{t("header.unlogin.login")}</button>
                                        <button className='btn-signup' onClick={() => handleRegister()}>{t("header.unlogin.signup")}</button>
                                    </>
                                    : <>
                                        <NavDropdown title={t("header.login.setting")} id="basic-nav-dropdown">
                                            <NavDropdown.Item
                                                onClick={() => setIsShowProfile(true)}
                                            >{t("header.login.profile")}</NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={() => handleLogout()}
                                            >
                                                {t("header.login.logout")}
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                            }
                            <Languages />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile
                account={account}
                show={isShowProfile}
                setShow={setIsShowProfile}
            />
        </>
    );
}

export default Header;