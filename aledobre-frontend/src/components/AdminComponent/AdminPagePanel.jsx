import './admin.css';
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

export const AdminPagePanel = () => {
    return (
        <div className="admin-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h5 className="text-white mt-4">Pannello di Controllo</h5>
                </div>
                <Nav className="flex-column">
                    <Nav.Link as={Link} to="/admin-panel/dishes" className="sidebar-link">
                        <i className="bi bi-grid-fill me-2"></i>
                        Gestione Piatti
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin-panel/reservations" className="sidebar-link">
                        <i className="bi bi-calendar-event-fill me-2"></i>
                        Prenotazioni
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin-panel/users" className="sidebar-link">
                        <i className="bi bi-people-fill me-2"></i>
                        Utenti
                    </Nav.Link>
                </Nav>
            </div>

            <div className="main-content">
                <Container fluid>
                    <Row>
                        <Col xs={12} className='p-4 mt-5 d-flex justify-content-center align-items-center'>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};