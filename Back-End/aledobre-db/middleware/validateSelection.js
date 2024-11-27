function validateSelection(selectedDishes, selectionRules) {
    const validationErrors = [];

    
    const hasSoup = selectedDishes.soup.length > 0;
    const hasAppetizer = selectedDishes.appetizer.length > 0;
    if (!hasSoup && !hasAppetizer) {
        validationErrors.push(`Devi selezionare almeno 1 piatto tra zuppa o antipasto.`);
    }

    
    if (selectionRules.firstOrSecond) {
        const hasFirstCourse = selectedDishes.firstCourse.length > 0;
        const hasSecondCourse = selectedDishes.secondCourse.length > 0;
        if (!hasFirstCourse && !hasSecondCourse) {
            validationErrors.push(`Devi selezionare almeno 1 piatto tra primo o secondo.`);
        }
    }

    
    if (selectedDishes.dessert.length < selectionRules.dessert) {
        validationErrors.push(`Devi selezionare almeno ${selectionRules.dessert} dolce/i.`);
    }

    return validationErrors;
}
