import db from './db.js';
import express from 'express'
import cors from 'cors'
import crypto from 'crypto-js'


const app = express();
app.use(cors());
app.use(express.json());



app.post('/login', async (req, resp) => {
    
    const login = req.body;
    
    const cryptoSenha = crypto.SHA256(login.senha).toString(crypto.enc.Base64)

    
    let r = await db.tb_usuario.findOne(
        { 
            where: { ds_login: login.usuario, 
                     ds_senha: cryptoSenha 
                    },
                    raw: true
        })
        
    
    if (r == null)
     return resp.send( { error: 'Credenciais Inválidas'});

    delete r.ds_senha;
    resp.send(r);
})


app.post('/sala', async (req, resp) => {
    try {
        let salaParam = req.body;

        let s = await db.tb_sala.findOne({ where: { nm_sala: salaParam.nome } });
        if (s != null)
            return resp.send({ erro: 'Sala já existe!' });

        let r = await db.tb_sala.create({
            nm_sala: salaParam.nome,
            bt_ativo: salaParam.ativo
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!'})
    }
})

app.get('/sala', async (req, resp) => {
    try {
        let salas = await db.tb_sala.findAll();
        resp.send(salas);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!'})
    }
})


app.post('/usuario', async (req, resp) => {
    try {
        let usuParam = req.body;

        let u = await db.tb_usuario.findOne({ where: { nm_usuario: usuParam.nome } });
        if (u != null)
            return resp.send({ erro: 'Usuário já existe!' });
        
        let r = await db.tb_usuario.create({
            nm_usuario: usuParam.nome,
            ds_login: usuParam.login,
            ds_senha: crypto.SHA256(usuParam.senha).toString(crypto.enc.Base64)
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!'})
    }
})

app.get('/usuario', async (req, resp) => {
    try {
        let usuarios = await db.tb_usuario.findAll();
        resp.send(usuarios);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!'})
    }
})

app.post('/chat', async (req, resp) => {
    try {
        let chat = req.body;

        let sala = await db.tb_sala.findOne({ where: { nm_sala: chat.sala.nome } });
        let usu = await db.tb_usuario.findOne({ where: { nm_usuario: chat.usuario.nome } })
    
        if (usu == null)
            return resp.send({ erro: 'Usuário não existe!' });
        
        if (sala == null)
            return resp.send({ erro: 'Sala não existe!' });
        
        if (!chat.mensagem || chat.mensagem.replace(/\n/g, '') == '')
            return resp.send({ erro: 'Mensagem é obrigatória!' });
        
        
        let mensagem = {
            id_sala: sala.id_sala,
            id_usuario: usu.id_usuario,
            ds_mensagem: chat.mensagem,
            dt_mensagem: new Date()
        }

        let r = await db.tb_chat.create(mensagem);
        resp.send(r);
        
    } catch (e) {
        resp.send('Deu erro');
        console.log(e.toString());
    }
});


app.get('/chat/:sala', async (req, resp) => {
    try {
        let sala = await db.tb_sala.findOne({ where: { nm_sala: req.params.sala } });
        
        if (sala == null)
            return resp.send({ erro: 'Sala não existe!' });
        
        let mensagens = await
            db.tb_chat.findAll({
                where: {
                    id_sala: sala.id_sala
                },
                order: [['id_chat', 'desc']],
                include: ['tb_usuario', 'tb_sala'],
            });
    
        resp.send(mensagens);
    } catch (e) {
        resp.send(e.toString())
    }
})

app.delete('/chat/:id', async (req,resp) =>{
    try {
        let r = await db.tb_chat.destroy({ where: { id_chat: req.params.id} })
        resp.sendStatus(200);

    } catch (error) {
        resp.send({ erro: error.toString()})
    }
}) 

app.delete('/usuario:id', async (req,resp) => {
    try { 
     let q = await db.tb_usuario.destroy({ where: { id_usuario: req.params.id }})
     resp.sendStatus(200); 
    } catch(e) {
         resp.send("Erro")
         console.log(e.toString());
     }
 });

app.put("/usuario", async (req,resp) => {
    try { 
     let id = req.query.id;
     let nome = req.body.nome;
 
     let q = await db.tb_usuario.update({ nm_usuario: nome }, { where: { id_usuario: id } })
 
     resp.sendStatus(200); } catch (e) {
         resp.send("Erro");
         console.log(e.toString());
     }
 });

app.put (`/chat/:id`, async (req, resp ) => {
try {
    let id = req.params.id;
    let mensagem = req.body.mensagem;

    let  r = await db.tb_chat.update({
        ds_mensagem: mensagem,
    },
    {
        where: { id_chat: id}
    });
    resp.sendStatus(200)
} catch (error) {
    resp.send( { erro: error.toString() })
}
});





app.listen(process.env.PORT,
           x => console.log(`>> Servidor Subiu Na Porta ${process.env.PORT}Cacete`))