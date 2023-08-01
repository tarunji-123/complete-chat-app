const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const chatDetails = sequelize.define('chat',{
    username:{
        type : Sequelize.STRING,
        allowNull : false,
    },
    message:{
        type : Sequelize.STRING,
        allowNull : false
    }
})

module.exports = chatDetails;
