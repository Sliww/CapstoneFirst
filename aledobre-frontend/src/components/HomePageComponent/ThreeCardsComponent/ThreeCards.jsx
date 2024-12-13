import './threecards.css';
import { Container, Row, Col } from 'react-bootstrap';
import ericPhoto from '../../../assets/eric.jpeg';
import cook from '../../../assets/cook.svg';
import how from '../../../assets/how.svg';
import clean from '../../../assets/clean.svg';
import cucina from '../../../assets/cucina.jpg';

export const ThreeCards = () => {
    return (
        <Container fluid className="cards-container py-5">
            <Row className="justify-content-center g-4">
                <Col xs={12} lg={4}>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img 
                                    src={cook} 
                                    alt="Chef Icon" 
                                    className="chef-icon"
                                />
                                <h2>Chi cucinerà per me?</h2>
                                <p>Scopri il tuo chef</p>
                            </div>
                            <div className="flip-card-back">
                                <div className="chef-info p-4">
                                    <div className="chef-header">
                                        <img 
                                            src={ericPhoto} 
                                            alt="Chef Eric Sliwinski" 
                                            className="chef-photo"
                                        />
                                        <div className="chef-title">
                                            <h3>Eric Sliwinski</h3>
                                            <span>Giovane Chef Italo-Polacco</span>
                                        </div>
                                    </div>
                                    <p className="chef-description">
                                        Grande passione per la cucina con oltre 5 anni di esperienza nella ristorazione. Porterà l'autentica tradizione culinaria polacca direttamente a casa tua.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={4}>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img 
                                    src={how} 
                                    alt="How it works Icon" 
                                    className="info-icon"
                                />
                                <h2>Come funziona?</h2>
                                <p>Scopri il processo di prenotazione</p>
                            </div>
                            <div className="flip-card-back">
                                <h3>Semplice e Veloce</h3>
                                <div className="booking-steps">
                                    <p>1. Seleziona data, numero di persone e location</p>
                                    <p>2. Scegli il menù base che preferisci</p>
                                    <p>3. Personalizza il menù secondo i tuoi gusti</p>
                                    <p>4. Indica eventuali intolleranze o richieste speciali</p>
                                    <p>5. Invia la richiesta per ricevere un preventivo personalizzato</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={4}>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img 
                                    src={clean} 
                                    alt="Cleaning Service Icon" 
                                    className="info-icon"
                                />
                                <h2>Come lasceremo la tua cucina</h2>
                                <p>Nessuna preoccupazione post evento</p>
                            </div>
                            <div className="flip-card-back">
                                <div className="kitchen-info">
                                    <img 
                                        src={cucina} 
                                        alt="Cucina pulita" 
                                        className="kitchen-photo"
                                    />
                                    <div className="kitchen-description">
                                        <h3>Pulizia Garantita</h3>
                                        <p>
                                            Rilassati e goditi l'esperienza! Ci occuperemo noi 
                                            della pulizia completa della cucina. Troverai la tua cucina perfettamente 
                                            pulita e in ordine.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};