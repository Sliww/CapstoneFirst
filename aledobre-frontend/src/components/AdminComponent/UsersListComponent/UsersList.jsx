import { useState, useEffect } from 'react';
import { Col, Table, Modal, Form } from 'react-bootstrap';
import './userslist.css';
import Swal from 'sweetalert2';

export const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        surname: '',
        email: '',
        telephone: '',
        isLazioResident: false
    });

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/users`);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Errore nel recupero degli utenti:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: 'Sei sicuro?',
            text: "Questa azione non può essere annullata!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#973131',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sì, elimina!',
            cancelButtonText: 'Annulla'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/user/delete/${userId}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    await Swal.fire(
                        'Eliminato!',
                        'L\'utente è stato eliminato con successo.',
                        'success'
                    );
                    fetchUsers();
                }
            } catch (error) {
                console.error('Errore durante l\'eliminazione:', error);
                Swal.fire(
                    'Errore!',
                    'Si è verificato un errore durante l\'eliminazione.',
                    'error'
                );
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditFormData({
            name: user.name,
            surname: user.surname,
            email: user.email,
            telephone: user.telephone,
            isLazioResident: user.isLazioResident
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/user/update/${editingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData)
            });

            if (response.ok) {
                setShowEditModal(false);
                Swal.fire('Successo!', 'Utente aggiornato con successo', 'success');
                fetchUsers();
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento:', error);
            Swal.fire('Errore!', 'Errore durante l\'aggiornamento dell\'utente', 'error');
        }
    };

    return (
        <Col className='pt-5 pb-3'>
            <h5>Lista degli Utenti Registrati</h5>
            <div className="table-responsive">
                <Table className="mt-4 user-table">
                    <thead>
                        <tr>
                            <th className="d-none d-md-table-cell">Nome</th>
                            <th className="d-none d-md-table-cell">Cognome</th>
                            <th>Email</th>
                            <th className="d-none d-lg-table-cell">Telefono</th>
                            <th className="d-none d-lg-table-cell">Residente</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className={user.role === 'admin' ? 'admin-row' : ''}>
                                <td className="d-none d-md-table-cell text-truncate" style={{ maxWidth: '150px' }}>
                                    {user.name}
                                </td>
                                <td className="d-none d-md-table-cell text-truncate" style={{ maxWidth: '150px' }}>
                                    {user.surname}
                                </td>
                                <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                    {user.email}
                                </td>
                                <td className="d-none d-lg-table-cell">
                                    {user.telephone}
                                </td>
                                <td className="d-none d-lg-table-cell text-center">
                                    {user.isLazioResident ? 'Sì' : 'No'}
                                </td>
                                <td>
                                    <div className="d-flex gap-2 justify-content-center">
                                        <button 
                                            className="btn-edit"
                                            size="sm"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <span className="d-none d-md-inline">Modifica</span>
                                            <i className="bi bi-pencil-fill d-md-none"></i>
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            size="sm"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            <span className="d-none d-md-inline">Elimina</span>
                                            <i className="bi bi-trash-fill d-md-none"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Utente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                type="text"
                                value={editFormData.surname}
                                onChange={(e) => setEditFormData({...editFormData, surname: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={editFormData.email}
                                onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                type="tel"
                                value={editFormData.telephone}
                                onChange={(e) => setEditFormData({...editFormData, telephone: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Residente nel Lazio"
                                checked={editFormData.isLazioResident}
                                onChange={(e) => setEditFormData({...editFormData, isLazioResident: e.target.checked})}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <button className='btn-delete' onClick={() => setShowEditModal(false)}>
                                Annulla
                            </button>
                            <button className="btn-saved" type="submit">
                                Salva Modifiche
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Col>
    );
};