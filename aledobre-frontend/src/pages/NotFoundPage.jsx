import { Container, Row, Col } from "react-bootstrap";

export const NotFound = () => {
    return (
        <Container>
            <Row>
                <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                    <h1 className="text-black">Oops!! Questa pagina non esiste...</h1>
                </Col>
            </Row>
        </Container>
    )
}