import { useState, useEffect } from 'react';
import './dishlist.css';
import { Col, Accordion, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

export const DishList = ({ onRefresh }) => {
    const [dishes, setDishes] = useState({
        Zuppa: [],
        Antipasto: [],
        Primo: [],
        Secondo: [],
        Dolce: []
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingDish, setEditingDish] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        ingredients: '',
        category: '',
        allergens: []
    });

    const fetchDishes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/dishes`);
            const { allDishes } = await response.json();
            
            const categorizedDishes = {
                Zuppa: [],
                Antipasto: [],
                Primo: [],
                Secondo: [],
                Dolce: []
            };

            allDishes.forEach(dish => {
                if (categorizedDishes[dish.category]) {
                    categorizedDishes[dish.category].push(dish);
                }
            });

            setDishes(categorizedDishes);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('Errore nel recupero dei piatti:', error);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Sei sicuro?',
            text: "Questa azione non può essere annullata!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sì, elimina!',
            cancelButtonText: 'Annulla'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/dishes/delete/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    await Swal.fire(
                        'Eliminato!',
                        'Il piatto è stato eliminato con successo.',
                        'success'
                    );
                    fetchDishes();
                }
            } catch (error) {
                console.error('Errore durante l\'eliminazione:', error);
                await Swal.fire(
                    'Errore!',
                    'Si è verificato un errore durante l\'eliminazione.',
                    'error'
                );
            }
        }
    };

    const handleEdit = (dish) => {
        setEditingDish(dish);
        setEditFormData({
            name: dish.name,
            ingredients: dish.ingredients,
            category: dish.category,
            allergens: dish.allergens
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editFormData.name);
        formData.append('ingredients', editFormData.ingredients);
        formData.append('category', editFormData.category);
        formData.append('allergens', JSON.stringify(editFormData.allergens));
        
        if (e.target.elements.image.files[0]) {
            formData.append('img', e.target.elements.image.files[0]);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/dishes/update/${editingDish._id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                toast.success('Piatto modificato con successo!');
                setShowEditModal(false);
                fetchDishes();
            }
        } catch (error) {
            console.error('Errore durante la modifica:', error);
            toast.error('Errore durante la modifica del piatto');
        }
    };

    return (
        <Col className='pt-5 pb-3'>
            <h5>Lista dei piatti</h5>
            <Accordion className="mt-3">
                {Object.entries(dishes).map(([category, categoryDishes]) => (
                    <Accordion.Item key={category} eventKey={category}>
                        <Accordion.Header>
                            {category} ({categoryDishes.length})
                        </Accordion.Header>
                        <Accordion.Body>
                            {categoryDishes.length > 0 ? (
                                categoryDishes.map(dish => (
                                    <div key={dish._id} className="dish-item">
                                        <div className="d-flex flex-column flex-md-row gap-3">
                                            {dish.img && (
                                                <div className="dish-image-container order-2 order-md-0">
                                                    <img 
                                                        src={dish.img} 
                                                        alt={dish.name} 
                                                        className="dish-image"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-grow-1 order-1 order-md-1">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h4><strong>{dish.name}</strong></h4>
                                                    <div className="d-flex gap-2">
                                                        <button 
                                                            className='btn-edit' 
                                                            size="sm"
                                                            onClick={() => handleEdit(dish)}
                                                        >
                                                            Modifica
                                                        </button>
                                                        <button 
                                                            className='btn-delete'
                                                            size="sm"
                                                            onClick={() => handleDelete(dish._id)}
                                                        >
                                                            Elimina
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="mb-1"><small><strong>Ingredienti:</strong> {dish.ingredients}</small></p>
                                                {dish.allergens.length > 0 && (
                                                    <p className="mb-1"><small><strong>Allergeni:</strong> {dish.allergens.join(', ')}</small></p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Nessun piatto in questa categoria</p>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Piatto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome del Piatto</Form.Label>
                            <Form.Control
                                type="text"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingredienti</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editFormData.ingredients}
                                onChange={(e) => setEditFormData({...editFormData, ingredients: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                value={editFormData.category}
                                onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                                required
                            >
                                <option value="">Seleziona una categoria</option>
                                <option value="Zuppa">Zuppa</option>
                                <option value="Antipasto">Antipasto</option>
                                <option value="Primo">Primo</option>
                                <option value="Secondo">Secondo</option>
                                <option value="Dolce">Dolce</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nuova Immagine (opzionale)</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                accept="image/*"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <button className='btn-delete'   onClick={() => setShowEditModal(false)}>
                                Annulla
                            </button>
                            <button className='btn-saved' type="submit">
                                Salva Modifiche
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Col>
    );
};