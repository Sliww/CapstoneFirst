export const menus = [
    {
        name: 'full',
        description: 'Menu completo con doppio primo.',
        displayRules: [
            "Una zuppa",
            "Un antipasto",
            "Due primi piatti",
            "Un secondo",
            "Un dolce"
        ],
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
        description: 'Menu completo con un solo primo.',
        displayRules: [
            "Una zuppa",
            "Un antipasto",
            "Un primo piatto",
            "Un secondo",
            "Un dolce"
        ],
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
        description: 'Menu base con scelta tra zuppa e antipasto.',
        displayRules: [
            "Una zuppa o un antipasto",
            "Un primo piatto",
            "Un secondo",
            "Un dolce"
        ],
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
        description: 'Menu minimal con scelta tra zuppa e antipasto, primo o secondo e dolce.',
        displayRules: [
            "Una zuppa o un antipasto",
            "Un primo o un secondo",
            "Un dolce"
        ],
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