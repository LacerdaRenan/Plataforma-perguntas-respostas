const {connection, sequelize} = require('./database')

// Criando uma tabela com o nome de 'question', caso não exista
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

//Sincronizando com o banco de dados
Quest.sync({force: false})
    .then(()=>{});

module.exports = Quest;