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
import Languages from './Languages';

const Header = () => {
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

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand href="#home">Minh Manh</Navbar.Brand> */}
                <NavLink to="/" className='navbar-brand'>FPT</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>Users</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>

                        {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link> */}
                    </Nav>

                    <Nav>
                        {
                            !isAuthenticated
                                ? <>
                                    <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                    <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                                </>
                                : <>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item >Profile</NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => handleLogout()}
                                        >
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                        }
                        <Languages />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;