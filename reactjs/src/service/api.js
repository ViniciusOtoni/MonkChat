import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {
    async listarMensagens(idSala) {
        let r = await api.get(`/chat/${idSala}`);
        return r.data;
    }
}