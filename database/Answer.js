const {connection, sequelize} = require('./database')

const Answer = connection.define('answers',{
    corpo:{
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaID:{
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force:false})

module.exports = Answer;