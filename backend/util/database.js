const Sequelize = require('sequelize');

const sequelize = new Sequelize ('chat-app', 'root', 'Tannu@141',{
    dialect : 'mysql',
    host : 'localhost'
})

module.exports = sequelize;
