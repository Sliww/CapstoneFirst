import { Row, Col, Card, Tabs, Tab, Form } from 'react-bootstrap';
import './dishselect.css';

export const DishSelection = ({ menuType, availableDishes, selectedDishes, onDishSelect }) => {
    const dishesByCategory = {
        Zuppa: availableDishes.filter(dish => dish.category === 'Zuppa'),
        Antipasto: availableDishes.filter(dish => dish.category === 'Antipasto'),
        Primo: availableDishes.filter(dish => dish.category === 'Primo'),
        Secondo: availableDishes.filter(dish => dish.category === 'Secondo'),
        Dolce: availableDishes.filter(dish => dish.category === 'Dolce')
    };

    const formatAllergeni = (allergens) => {
        if (!allergens) return '';

        if (typeof allergens === 'string' && allergens.startsWith('[')) {
            try {
                return JSON.parse(allergens).join(', ');
            } catch {
                return allergens;
            }
        }

        if (Array.isArray(allergens)) {
            return allergens.join(', ');
        }
        
        return allergens;
    };

    const renderDishCategory = (category, maxSelectable) => {
        const selectedInCategory = selectedDishes.filter(id => 
            availableDishes.find(d => d._id === id)?.category === category
        ).length;

        return (
            <div className="dish-category mb-4">
                <h4 className="mb-3">
                    {category} - Seleziona {maxSelectable} {maxSelectable === 1 ? 'piatto' : 'piatti'}
                    <small className="ms-2 text-muted">
                        ({selectedInCategory}/{maxSelectable} selezionati)
                    </small>
                </h4>
                <Row>
                    {dishesByCategory[category]?.map(dish => (
                        <Col md={4} key={dish._id} className="mb-3">
                            <Form.Group>
                                <Card 
                                    className={`dish-card ${selectedDishes.includes(dish._id) ? 'selected' : ''}`}
                                >
                                    {dish.img && (
                                        <Card.Img 
                                            variant="top" 
                                            src={dish.img} 
                                            alt={dish.name}
                                            className="dish-image"
                                        />
                                    )}
                                    <Card.Body>
                                        <Form.Check
                                            type={maxSelectable === 1 ? "radio" : "checkbox"}
                                            id={`${category}-${dish._id}`}
                                            name={category}
                                            label={dish.name}
                                            checked={selectedDishes.includes(dish._id)}
                                            onChange={() => {
                                                let newSelection = [...selectedDishes];
                                                if (maxSelectable === 1) {
                                                    newSelection = newSelection.filter(id => 
                                                        availableDishes.find(d => d._id === id)?.category !== category
                                                    );
                                                    newSelection.push(dish._id);
                                                } else {
                                                    if (newSelection.includes(dish._id)) {
                                                        newSelection = newSelection.filter(id => id !== dish._id);
                                                    } else if (selectedInCategory < maxSelectable) {
                                                        newSelection.push(dish._id);
                                                    }
                                                }
                                                onDishSelect(newSelection);
                                            }}
                                        />
                                        <Card.Text>
                                            <small className="text-muted d-block">
                                                Ingredienti: {dish.ingredients}
                                            </small>
                                            {dish.allergens?.length > 0 && (
                                                <small className="text-danger d-block mt-1">
                                                    Allergeni: {formatAllergeni(dish.allergens)}
                                                </small>
                                            )}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    };

    switch (menuType) {
        case 'full':
            return (
                <>
                    {renderDishCategory('Zuppa', 1)}
                    {renderDishCategory('Antipasto', 1)}
                    {renderDishCategory('Primo', 2)}
                    {renderDishCategory('Secondo', 1)}
                    {renderDishCategory('Dolce', 1)}
                </>
            );
        
        case 'extended':
            return (
                <>
                    {renderDishCategory('Zuppa', 1)}
                    {renderDishCategory('Antipasto', 1)}
                    {renderDishCategory('Primo', 1)}
                    {renderDishCategory('Secondo', 1)}
                    {renderDishCategory('Dolce', 1)}
                </>
            );
        
        case 'basic':
            return (
                <>
                    <div className="choice-section mb-4">
                        <h4>Scegli tra Zuppa o Antipasto (1 piatto)</h4>
                        <Tabs defaultActiveKey="zuppa" className="mb-3">
                            <Tab eventKey="zuppa" title="Zuppe">
                                {renderDishCategory('Zuppa', 1)}
                            </Tab>
                            <Tab eventKey="antipasto" title="Antipasti">
                                {renderDishCategory('Antipasto', 1)}
                            </Tab>
                        </Tabs>
                    </div>
                    {renderDishCategory('Primo', 1)}
                    {renderDishCategory('Secondo', 1)}
                    {renderDishCategory('Dolce', 1)}
                </>
            );
        
        case 'minimal':
            return (
                <>
                    <div className="choice-section mb-4">
                        <h4>Scegli tra Zuppa o Antipasto (1 piatto)</h4>
                        <Tabs defaultActiveKey="zuppa" className="mb-3">
                            <Tab eventKey="zuppa" title="Zuppe">
                                {renderDishCategory('Zuppa', 1)}
                            </Tab>
                            <Tab eventKey="antipasto" title="Antipasti">
                                {renderDishCategory('Antipasto', 1)}
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="choice-section mb-4">
                        <h4>Scegli tra Primo o Secondo (1 piatto)</h4>
                        <Tabs defaultActiveKey="primo" className="mb-3">
                            <Tab eventKey="primo" title="Primi">
                                {renderDishCategory('Primo', 1)}
                            </Tab>
                            <Tab eventKey="secondo" title="Secondi">
                                {renderDishCategory('Secondo', 1)}
                            </Tab>
                        </Tabs>
                    </div>
                    {renderDishCategory('Dolce', 1)}
                </>
            );
        
        default:
            return null;
    }
};
