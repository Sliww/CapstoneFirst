import { useState, useEffect } from 'react';
import { Col, Row, Card, Badge, Spinner, Modal } from 'react-bootstrap';
import './userreservations.css';

export const UsersReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState(null);
    const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL_EPI;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${BASE_URL}/reservations`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                
                if (response.ok) {
                    setReservations(data.reservations);
                } else {
                    throw new Error(data.message || 'Error loading reservations');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = async (reservationId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setReservations(prev => prev.filter(res => res._id !== reservationId));
                setShowConfirmModal(false);
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Error deleting reservation');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="user-reservations-container">
            <h1 className="mb-4">Prenotazioni</h1>
            <Row>
                {reservations.map((reservation) => (
                    <Col xs={12} key={reservation._id} className="mb-4">
                        <Card className="reservation-card">
                            <Card.Header>
                                <Badge bg="primary">
                                    {formatDate(reservation.date)}
                                </Badge>
                                <Badge bg="secondary" className="ms-2">
                                    {reservation.menuType.toUpperCase()}
                                </Badge>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    Cliente: {reservation.user.name} {reservation.user.surname}
                                </Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {reservation.user.email}<br />
                                    <strong>Telefono:</strong> {reservation.user.telephone || 'Not specified'}<br />
                                    <strong>Persone:</strong> {reservation.peopleCount}<br />
                                    <strong>Location:</strong> {reservation.location}<br />
                                </Card.Text>

                                <div className="selected-dishes mt-3">
                                    <h6>Piatti Selezionati:</h6>
                                    <ul>
                                        {reservation.selectedDishes.map((dish) => (
                                            <li key={dish._id}>
                                                {dish.name} - {dish.category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {reservation.intolerances && (
                                    <div className="mt-2">
                                        <strong>Intolleranze:</strong><br />
                                        {reservation.intolerances}
                                    </div>
                                )}

                                {reservation.specialRequests && (
                                    <div className="mt-2">
                                        <strong>Richieste Speciali:</strong><br />
                                        {reservation.specialRequests}
                                    </div>
                                )}
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                    Prenotazione effettuata il: {formatDate(reservation.createdAt)}
                                </small>
                                <button 
                                    className='btn-delete' 
                                    size="sm"
                                    onClick={() => {
                                        setReservationToDelete(reservation);
                                        setShowConfirmModal(true);
                                    }}
                                >
                                    Elimina
                                </button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sei sicuro di voler eliminare questa prenotazione?
                    {reservationToDelete && (
                        <div className="mt-2">
                            <strong>Cliente:</strong> {reservationToDelete.user.name} {reservationToDelete.user.surname}<br />
                            <strong>Data:</strong> {formatDate(reservationToDelete.date)}<br />
                            <strong>Menu:</strong> {reservationToDelete.menuType}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn-saved' onClick={() => setShowConfirmModal(false)}>
                        Annulla
                    </button>
                    <button 
                        className='btn-delete' 
                        onClick={() => handleDelete(reservationToDelete._id)}
                    >
                        Elimina
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};