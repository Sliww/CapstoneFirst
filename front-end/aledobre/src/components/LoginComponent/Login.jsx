import { useEffect } from 'react';
import './login.css'

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Login = () => {
    useEffect(() => {
        document.body.classList.add('login-page');

        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    return (
        <Container className="vh-100">
            <Row className="h-100">
                <Col className="h-100">
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                        <form className="d-flex flex-column gap-3 personalBorder p-4">
                            <h2 className="text-white text-center">LOGIN</h2>
                            <input
                                className="form-control"
                                name="email"
                                type="email"
                                placeholder="Email" />
                            <input
                                className="form-control"
                                name="password"
                                type="password"
                                placeholder="Password" />
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                            <Link to="/register">
                                <button className="btn btn-primary w-100" type="button">
                                    Register
                                </button>
                            </Link>
                            <Link to="/" className="text-center text-white text-decoration-none mt-2">
                                Return to Home
                            </Link>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;