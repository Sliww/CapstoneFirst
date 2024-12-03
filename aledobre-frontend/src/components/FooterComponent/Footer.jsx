import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import instagram from '../../assets/logo-instagram.svg'
import tiktok from '../../assets/logo-tiktok.svg'
import youtube from '../../assets/logo-youtube.svg'
import './footer.css';

export const Footer = () => {
    return (
        <Container fluid className='footer-background mt-4'>
            <Row className='mt-4'>
                <Col xs={12}>
                    <ul className='footer-list text-center d-flex flex-column flex-lg-row justify-content-lg-center gap-2'>
                        <li>
                            <p>Copyright © 2024 Aledobre - Tutti i diritti riservati</p>
                        </li>
                        <li>
                            <p>
                                Designed by <a href="https://www.linkedin.com/in/mateusz-sliwinski-08b5a3259/" target="_blank" rel="noopener noreferrer">Mateusz Sliwinski</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <Link to="/contatti">Contatti</Link>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="#" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
                            </p>
                        </li>
                    </ul>
                </Col>
                <Col xs={12}>
                    <ul className='footer-list text-center d-flex justify-content-center gap-2'>
                        <li>
                            <p>Social</p>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/ericsliw/" className="social-icon">
                                <img src={instagram} alt="Instagram" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/@ericsliw_" className="social-icon">
                                <img src={tiktok} alt="TikTok" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@ericsliw" className="social-icon">
                                <img src={youtube} alt="YouTube" />
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}