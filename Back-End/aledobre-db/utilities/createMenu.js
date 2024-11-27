// FILE USED TO CREATE THE 4 MENUS IN THE DATABASE 
// WORK IN PROGRESS ON IT

const mongoose = require('mongoose');
const Menu = require('../models/Menumodel');

async function createMenus() {
    await mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });

    const menus = [
        {
            name: 'Full',
            description: 'Menu completo con tutte le opzioni.',
            priceRanges: [
                { minPeople: 2, maxPeople: 4, pricePerPerson: 150 },
                { minPeople: 5, maxPeople: 7, pricePerPerson: 120 },
                { minPeople: 8, maxPeople: 10, pricePerPerson: 100 },
                { minPeople: 11, maxPeople: 40, pricePerPerson: 80 }
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
            name: 'Extended',
            description: 'Menu esteso con opzioni aggiuntive.',
            priceRanges: [
                { minPeople: 2, maxPeople: 4, pricePerPerson: 140 },
                { minPeople: 5, maxPeople: 7, pricePerPerson: 110 },
                { minPeople: 8, maxPeople: 10, pricePerPerson: 90 },
                { minPeople: 11, maxPeople: 40, pricePerPerson: 70 }
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
            name: 'Basic',
            description: 'Menu base con le opzioni essenziali.',
            priceRanges: [
                { minPeople: 2, maxPeople: 4, pricePerPerson: 130 },
                { minPeople: 5, maxPeople: 7, pricePerPerson: 100 },
                { minPeople: 8, maxPeople: 10, pricePerPerson: 80 },
                { minPeople: 11, maxPeople: 40, pricePerPerson: 60 }
            ],
            selectionRules: {
                soupOrAppetizer: 1,
                firstCourse: 1,
                secondCourse: 1,
                dessert: 1
            }
        },
        {
            name: 'Minimal',
            description: 'Menu minimalista con poche opzioni.',
            priceRanges: [
                { minPeople: 2, maxPeople: 4, pricePerPerson: 120 },
                { minPeople: 5, maxPeople: 7, pricePerPerson: 90 },
                { minPeople: 8, maxPeople: 10, pricePerPerson: 70 },
                { minPeople: 11, maxPeople: 40, pricePerPerson: 50 }
            ],
            selectionRules: {
                soupOrAppetizer: 1,
                firstOrSecond: 1,
                dessert: 1
            }
        }
    ];

    try {
        await Menu.insertMany(menus);
        console.log('Menu creati con successo!');
    } catch (error) {
        console.error('Errore nella creazione dei menu:', error);
    } finally {
        mongoose.connection.close();
    }
}

createMenus();