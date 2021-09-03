import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {
    async listarMensagens(idSala) {
        let r = await api.get(`/chat/${idSala}`);
        return r.data;
    }

    async inserirMensagem(nomeSala, nomeUsuario, mensagem) {
        let chat = {
            sala: {
                nome: nomeSala
            },
            usuario: {
                nome: nomeUsuario
            },
            mensagem: mensagem
        }
        let r = await api.post(`/chat`, chat);
        return r.data;
    }

    async inserirSala(sala) {
        let r = await api.post(`/sala/`, { nome: sala });
        return r.data;
    }

    async inserirUsuario(usuario) {
        let r = await api.post(`/usuario/`, { nome: usuario });
        return r.data;
    }

    async login(usuario, senha) {
        let r = await api.post('/login', { usuario, senha } )
        return r.data;
    }
    async removerMensagem(id) {
        let r = await api.delete(`/chat/${id}`)
        return r.data;
    }

    async alterarMensagem(id, msg) {
        let r = await api.put(`/chat/${id}`, { mensagem: msg })
        return r.data;
    }

    async banir(id) {
        let r = await api.delete(`/usuario/${id}` )
        return r.data;
    }
}