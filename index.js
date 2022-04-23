const express = require('express');
const bodyParser = require('body-parser');
const {connection} = require('./database/database');
const Quest = require('./database/Question');
const Answer = require('./database/Answer')
const app = express();

//Conectando com banco de dados
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
    //SELECT * FROM question;
    //Ordenando do mais recente para o mais antigo via id
    Quest.findAll({raw:true, order:[['id','DESC']]})
        .then((q)=>{
            res.render('index',{
                perguntas:q
            });
        })
})

app.get('/ask', (req,res)=>{
    res.render('ask');
})

//Rota para salvar dados do fomulário no banco de dados
app.post('/save-quest', (req,res)=>{
    let title = req.body.titulo;
    let desc=req.body.descricao;

    Quest.create({
        titulo:title,
        descricao:desc
    }).then(()=>{
        console.log('new data included')
        res.redirect('/');
    })
})

app.get('/quest/:id', (req,res)=>{
    let id = req.params.id;
    Quest.findOne({
        where:{
            id:id
        }
    }).then((q)=>{
        Answer.findAll({
            where:{
                perguntaID:id
            }
        }).then((a)=>{
            if(q){
                res.render('quest',{
                    pergunta:q,
                    respostas:a
                });
            }else{
                res.redirect('/');
            }
        })
    })
})

app.post('/save-answer', (req,res)=>{
    let answer = req.body.Answer;
    let id = req.body.AnswerID;

    Answer.create({
        corpo:answer,
        perguntaID:id
    }).then(()=>{
        res.redirect(`/quest/${id}`);
    })
})

app.listen(8080, ()=>console.log('Running...'));