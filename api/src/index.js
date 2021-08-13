import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());

app.get('/chat/:salaId', async (req, resp) => {
    try {
        let mensagens = await
            db.tb_chat.findAll({
                where: {
                    id_sala: req.params.salaId
                },
                include: ['tb_usuario', 'tb_sala'],
            });
    
        resp.send(mensagens);
    } catch (e) {
        resp.send(e.toString())
    }
})


app.listen(process.env.PORT,
           x => console.log(`Server up at port ${process.env.PORT}`))