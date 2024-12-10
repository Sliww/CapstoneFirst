import './adddish.css';
import { Col, Collapse, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { DishList } from './DishListComponent/DishList';

export const AddDish = () => {
    const [formData, setFormData] = useState({
        name: '',
        ingredients: '',
        allergens: [],
        category: ''
    });

    const [image, setImage] = useState(null);
    const [openAllergens, setOpenAllergens] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAllergensChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            allergens: checked
                ? [...prev.allergens, value]
                : prev.allergens.filter(allergen => allergen !== value)
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('ingredients', formData.ingredients);
        data.append('allergens', JSON.stringify(formData.allergens));
        data.append('category', formData.category);
        if (image) {
            data.append('img', image);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/dishes/create`, {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                toast.success('Piatto aggiunto con successo!');
                setFormData({
                    name: '',
                    ingredients: '',
                    allergens: [],
                    category: ''
                });
                setImage(null);
                setRefreshKey(prev => prev + 1);
            } else {
                const responseData = await response.json();
                toast.error(responseData.message || 'Errore durante l\'aggiunta del piatto');
            }
        } catch (error) {
            console.error('Errore:', error);
            toast.error('Errore durante l\'aggiunta del piatto. Riprova più tardi.');
        }
    };

    return (
        <Col xs={12} lg={8} className="mx-auto">
            <Toaster position="top-center" />
            <h5>Aggiungi un nuovo piatto</h5>
            <Form onSubmit={handleSubmit} className='d-flex flex-column gap-1 p-4 form-add-dish'>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Nome del Piatto</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formIngredients" className="mb-3">
                    <Form.Label>Ingredienti</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                        style={{ 
                            resize: 'vertical',
                            minHeight: '100px'
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="formAllergens" className="mb-3">
                    <div className="d-flex align-items-center justify-content-between allergens-header"
                        style={{
                            cursor: 'pointer',
                            padding: '10px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            marginBottom: '10px'
                        }}
                    >
                        <span>Allergeni</span>
                        <button
                            type="button"
                            onClick={() => setOpenAllergens(!openAllergens)}
                            className="btn btn-link p-0 m-0"
                            style={{ textDecoration: 'none', fontSize: '1.5rem', color: '#973131' }}
                        >
                            {openAllergens ? '▼' : '▶'}
                        </button>
                    </div>

                    <Collapse in={openAllergens}>
                        <div className="allergens-container">
                            {['Glutine', 'Crostacei', 'Uova', 'Pesce', 'Arachidi', 'Soia', 'Latte', 'Frutta a Guscio', 'Sedano', 'Sesamo', 'Molluschi'].map(allergen => (
                                <Form.Check
                                    key={allergen}
                                    type="checkbox"
                                    label={allergen}
                                    value={allergen}
                                    checked={formData.allergens.includes(allergen)}
                                    onChange={handleAllergensChange}
                                    className="mb-2"
                                />
                            ))}
                        </div>
                    </Collapse>
                </Form.Group>

                <Form.Group controlId="formCategory" className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleziona una categoria</option>
                        <option value="Zuppa">Zuppa</option>
                        <option value="Antipasto">Antipasto</option>
                        <option value="Primo">Primo</option>
                        <option value="Secondo">Secondo</option>
                        <option value="Dolce">Dolce</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formImage" className="mb-3">
                    <Form.Label>Immagine del Piatto</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {image && (
                        <div className="mt-2">
                            <small className="text-muted">
                                File selezionato: {image.name}
                            </small>
                        </div>
                    )}
                </Form.Group>

                <button className='btn-saved' type="submit">
                    Aggiungi Piatto
                </button>
            </Form>
            
            <DishList key={refreshKey} />
        </Col>
    );
};