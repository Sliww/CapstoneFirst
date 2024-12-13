import './contacts.css';
import { Container, Row, Col } from 'react-bootstrap';
import instagram from '../../assets/logo-instagram.svg'
import tiktok from '../../assets/logo-tiktok.svg'
import youtube from '../../assets/logo-youtube.svg'

export const Contacts = () => {
    return (
        <>
            <Container fluid className="contacts-container">
                <Row className="contacts-row justify-content-center">
                <Col className="text-center" xs={12}>
                    <h3 className="text-white">Hai domande o perplessità?</h3>
                    <h1 className="text-white text-custom">Contattaci!</h1>
                </Col>
                <Col xs={12} md={8} lg={6} className="text-center mx-auto">
                    <p className="text-white fs-5 contact-text">
                        Per qualsiasi chiarimento, richiesta particolare o informazione sui nostri chef e servizi, non esitare a scriverci!
                        Puoi inviare una mail o chiamarci e ti risponderemo nel più breve tempo possibile.
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col xs={12} lg={4} className="text-center mb-4 mb-lg-0">
                    <div className="contact-info">
                        <i className="bi bi-telephone-fill text-white fs-1 mb-3"></i>
                        <h4 className="text-white">Telefono</h4>
                        <a href="tel:+39123456789" className="text-white text-decoration-none contact-link">
                            +39 123 456 789
                        </a>
                    </div>
                </Col>
                <Col xs={12} lg={4} className="text-center">
                    <div className="contact-info">
                        <i className="bi bi-envelope-fill text-white fs-1 mb-3"></i>
                        <h4 className="text-white">Email</h4>
                        <a href="mailto:info@aledobre.com" className="text-white text-decoration-none contact-link">
                            info@aledobre.com
                        </a>
                    </div>
                </Col>
                </Row>
            </Container>
            <Container fluid className="social-container py-5">
                <Row className="justify-content-center">
                    <Col xs={12} className="text-center mb-4">
                        <h3 className="text-black mb-4">I Nostri Social</h3>
                        <Col xs={12} md={8} lg={6} className="mx-auto">
                            <p className="text-muted social-description mb-5">
                                Sei un appassionato di cucina e vuoi rimanere sempre connesso? 
                                Seguimi sui miei social un modo perfetto per esplorare 
                                nuove idee gastronomiche e lasciarti ispirare per la tua prossima esperienza culinaria.
                            </p>
                        </Col>
                    </Col>
                    <Col xs={12} className="text-center">
                        <ul className="social-list">
                            <li>
                                <a 
                                    href="https://www.instagram.com/ericsliw/" 
                                    className="social-icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={instagram} alt="Instagram" />
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://www.tiktok.com/@ericsliw_" 
                                    className="social-icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={tiktok} alt="TikTok" />
                                    <span>TikTok</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://www.youtube.com/@ericsliw" 
                                    className="social-icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={youtube} alt="YouTube" />
                                    <span>YouTube</span>
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
