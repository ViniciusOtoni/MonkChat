import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());



app.post('/chat', async (req, resp) => {
    try {
        let chat = req.body;

        let sala = await db.tb_sala.findOne({ where: { nm_sala: chat.sala.nome } });
        let usu = await db.tb_usuario.findOne({ where: { nm_usuario: chat.usuario.nome } })
    
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


app.get('/chat/:salaId', async (req, resp) => {
    try {
        let mensagens = await
            db.tb_chat.findAll({
                where: {
                    id_sala: req.params.salaId
                },
                order: [['id_chat', 'desc']],
                include: ['tb_usuario', 'tb_sala'],
            });
    
        resp.send(mensagens);
    } catch (e) {
        resp.send(e.toString())
    }
})



app.listen(process.env.PORT,
           x => console.log(`>> Server up at port ${process.env.PORT}`))