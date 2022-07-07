const { Model, DataTypes } = require('sequelize')
const sequelize = require('./database')
// Uporaba Extending Model namesto Calling
class User extends Model {}

//Notranje, sequelize.define kliče Model.init
User.init({
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, //options vsebuje instanco database.js, ki se je tam ustvarila -> const sequelize = new Sequelize()....
    {
        sequelize,
        modelName: 'user',
        timestamps: false
        //timestamps: false <- ta parameter odstrani uporabo createdAt in updatedAt + potrebno je vsiliti podatkovno bazo v index.js
    })

module.exports = User;
