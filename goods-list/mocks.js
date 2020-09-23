const faker = require('faker');
const Goods = require('./classes/Goods');

module.exports = async () => {
    try {
        Array.from({length: 80}).forEach(async () => {
            const max = 1000;
            const min = 0.01;

            let title = faker.lorem.words(3);
            let price = Math.random() * (max - min) + min;

            Goods.add({title, price});
        });
    } catch (error) {
        console.log(error);
    }
}