import { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './manage.css';

export const ManageReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL_EPI;

    useEffect(() => {
        fetchUserReservations();
    }, []);

    const fetchUserReservations = async () => {
        try {
            const token = localStorage.getItem('token');
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const userId = tokenData.id;

            const response = await fetch(`${BASE_URL}/reservations/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setReservations(data.reservations);
            } else {
                throw new Error(data.message || 'Error fetching reservations');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reservationId) => {
        try {
            const result = await Swal.fire({
                title: 'Sei sicuro?',
                text: "Non potrai recuperare questa prenotazione!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, elimina!',
                cancelButtonText: 'Annulla'
            });

            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setReservations(prev => prev.filter(res => res._id !== reservationId));
                    await Swal.fire(
                        'Eliminata!',
                        'La tua prenotazione è stata eliminata.',
                        'success'
                    );
                } else {
                    throw new Error('Error during deletion');
                }
            }
        } catch (error) {
            Swal.fire(
                'Errore!',
                'Qualcosa è andato storto.',
                'error'
            );
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <Row><Col><Spinner animation="border" /></Col></Row>;
    if (error) return (
        <Row>
            <Col>
                <div className="error-messagee">
                    Errore durante il caricamento delle prenotazioni
                </div>
            </Col>
        </Row>
    );
    if (reservations.length === 0) return <Row><Col><div className="no-reservations">Non hai prenotazioni attive</div></Col></Row>;

    return (
        <Row>
            <Col xs={12}>
                <h2 className="mb-4 pt-5">Le tue prenotazioni</h2>
            </Col>
            {reservations.map(reservation => (
                <Col md={6} lg={4} key={reservation._id} className="mb-4">
                    <Card className="reservation-card">
                        <Card.Header>
                            <h5 className="mb-0">Prenotazione del {formatDate(reservation.date)}</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="reservation-details">
                                <p><strong>Menu:</strong> {reservation.menuType}</p>
                                <p><strong>Persone:</strong> {reservation.peopleCount}</p>
                                <p><strong>Location:</strong> {reservation.location}</p>
                                
                                <div className="mt-3">
                                    <h6>Piatti selezionati:</h6>
                                    <ul>
                                        {reservation.selectedDishes.map(dish => (
                                            <li key={dish._id}>{dish.name}</li>
                                        ))}
                                    </ul>
                                </div>

                                {reservation.intolerances && (
                                    <p><strong>Intolleranze:</strong> {reservation.intolerances}</p>
                                )}
                                
                                {reservation.specialRequests && (
                                    <p><strong>Richieste speciali:</strong> {reservation.specialRequests}</p>
                                )}
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <button 
                                className="btn-delete" 
                                onClick={() => handleDelete(reservation._id)}
                            >
                                Elimina prenotazione
                            </button>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
