const sequelize = require('sequelize');
const connection = new sequelize('meuBanco','root','12345678',{
    host:'localhost',
    dialect:'mysql'
});

module.exports={connection, sequelize};