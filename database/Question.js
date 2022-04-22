const {connection, sequelize} = require('./database')

const Quest = connection.define('question',{
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

Quest.sync({force: false})
    .then(()=>{});