const { Sequelize } = require('sequelize')

// test-db je ime podatkovne baze - glede na to da se uporablja sqlite uporabniškega imena in gesla ni potrebno vnesti

const sequelize = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    // :memory: je za testiranje, za ustvarjanje pa se ustvari datoteka
    host: './dev.sqlite'
})

module.exports = sequelize;
// exportamo in ga uporabimo v index.js
