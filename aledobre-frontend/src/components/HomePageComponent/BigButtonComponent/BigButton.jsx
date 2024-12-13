import './bigbutton.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const BigButton = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className="p-0">
                    <div className="big-button-container">
                        <Link to="/prenota" className="custom-big-button">
                            PRENOTA ORA
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}