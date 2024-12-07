const menus = require('../utilities/menuConfig');

function validateSelection(selectedDishes, menuType) {
    const menu = menus.find(m => m.name === menuType);
    if (!menu) throw new Error(`Il tipo di menù "${menuType}" non è valido.`);

    const { selectionRules } = menu;
    const validationErrors = [];

    Object.entries(selectionRules).forEach(([category, requiredCount]) => {
        const selectedCount = (selectedDishes[category] || []).length;
        if (!selectedDishes[category]) {
            validationErrors.push(`La categoria "${category}" è mancante.`);
        } else if (selectedCount < requiredCount) {
            validationErrors.push(`Devi selezionare almeno ${requiredCount} piatto/i nella categoria "${category}".`);
        }
    });

    return validationErrors;
}

module.exports = validateSelection;
