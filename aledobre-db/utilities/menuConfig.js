const menus = [
    {
        name: 'full',
        description: 'Menu completo con tutte le opzioni.',
        priceRanges: [
            { minPeople: 2, maxPeople: 4, pricePerPerson: 100 },
            { minPeople: 5, maxPeople: 7, pricePerPerson: 80 },
            { minPeople: 8, maxPeople: 10, pricePerPerson: 70 },
            { minPeople: 11, maxPeople: 40, pricePerPerson: 60 }
        ],
        selectionRules: {
            soup: 1,
            appetizer: 1,
            firstCourse: 2,
            secondCourse: 1,
            dessert: 1
        }
    },
    {
        name: 'extended',
        description: 'Menu esteso con opzioni aggiuntive.',
        priceRanges: [
            { minPeople: 2, maxPeople: 4, pricePerPerson: 85 },
            { minPeople: 5, maxPeople: 7, pricePerPerson: 65 },
            { minPeople: 8, maxPeople: 10, pricePerPerson: 55 },
            { minPeople: 11, maxPeople: 40, pricePerPerson: 45 }
        ],
        selectionRules: {
            soup: 1,
            appetizer: 1,
            firstCourse: 1,
            secondCourse: 1,
            dessert: 1
        }
    },
    {
        name: 'basic',
        description: 'Menu base con le opzioni essenziali.',
        priceRanges: [
            { minPeople: 2, maxPeople: 4, pricePerPerson: 75 },
            { minPeople: 5, maxPeople: 7, pricePerPerson: 55 },
            { minPeople: 8, maxPeople: 10, pricePerPerson: 50 },
            { minPeople: 11, maxPeople: 40, pricePerPerson: 45 }
        ],
        selectionRules: {
            soupOrAppetizer: 1,
            firstCourse: 1,
            secondCourse: 1,
            dessert: 1
        }
    },
    {
        name: 'minimal',
        description: 'Menu minimalista con poche opzioni.',
        priceRanges: [
            { minPeople: 2, maxPeople: 4, pricePerPerson: 70 },
            { minPeople: 5, maxPeople: 7, pricePerPerson: 50 },
            { minPeople: 8, maxPeople: 10, pricePerPerson: 45 },
            { minPeople: 11, maxPeople: 40, pricePerPerson: 40 }
        ],
        selectionRules: {
            soupOrAppetizer: 1,
            firstOrSecond: 1,
            dessert: 1
        }
    }
];

module.exports = menus;