const express = require('express');
const bodyParser = require('body-parser');
const {connection} = require('./database/database');
const perguntaModel = require('./database/Question')
const app = express();

connection.authenticate()
    .then(()=>{
        console.log(console.log('Database Connected'))
    })
    .catch((e)=>{
        console.log(e);
    })

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
   res.render('index');
})

app.get('/ask', (req,res)=>{
    res.render('ask');
})

app.post('/save-quest', (req,res)=>{
    let titulo = req.body.titulo;
    let descricao=req.body.descricao;
    console.log(titulo, descricao);
    res.json({
        Titulo:titulo,
        descricao:descricao
    });
})

app.listen(8080, ()=>console.log('Running...'));