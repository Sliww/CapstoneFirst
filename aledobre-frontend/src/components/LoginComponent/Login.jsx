import './login.css';
import { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/aledobregiusto.png';
import Swal from 'sweetalert2';

export const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const postRequest = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const responseData = await res.json();

            if (res.ok) {
                setTimeout(() => {
                    localStorage.setItem("token", JSON.stringify(responseData.token));
                    navigate("/");
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Errore di accesso',
                    text: 'Email o password non corrette',
                    confirmButtonColor: '#973131',
                    background: '#F2E8C6',
                    color: '#000000'
                });
                console.log("Errore login:", responseData);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Si è verificato un errore durante il login. Riprova più tardi.',
                confirmButtonColor: '#973131',
                background: '#F2E8C6',
                color: '#000000'
            });
            console.log("Errore nella richiesta:", error.message);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await postRequest();
    };

    return (
        <Container className="vh-100">
            <Row className="h-100">
                <Col className="h-100">
                    <div className="h-100 d-flex flex-column align-items-center justify-content-start">

                        <div className="logoaledobre">
                            <img src={logo} alt="logo" />
                        </div>
                        <form
                            onSubmit={onSubmitHandler}
                            className="d-flex flex-column gap-3 personalBorder p-3"
                        >
                            <h2 className="text-white text-center">LOGIN</h2>
                            <input
                                className="form-control"
                                onChange={onChangeHandler}
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    onChange={onChangeHandler}
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                />
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn-eye p-1"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <button className="btns-common" type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>
                            <Link to="/signup">
                                <button className="btns-common w-100" type="button">
                                    Register
                                </button>
                            </Link>
                            <Link to="/" className="text-center text-white text-decoration-none mt-2">
                                Torna alla Home
                            </Link>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;