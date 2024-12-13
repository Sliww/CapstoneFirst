import './text.css';
import { Container, Row, Col } from 'react-bootstrap';

export const TextBannerComponent = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className="p-0">
                    <div className="text-banner-container">
                        <div className="text-content">
                            
                            <p className="fs-1">Prenota la tua esperienza culinaria con AleDobre in pochi minuti! Avrai la comodità di un ristorante direttamente a casa tua.</p>
                        </div>
                        <div className="image-container"></div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
