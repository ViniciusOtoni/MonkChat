import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'
 
import { ContainerConteudo } from './conteudo.styled'
import { ChatButton, ChatInput, ChatTextArea } from '../../components/outros/inputs'

import { useState, useRef } from 'react';


import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom'

import Api from '../../service/api';
const api = new Api();

function lerUsuarioQuelogou(navegation) {
    let logado = Cookies.get('usuario-logado');
    if(logado == null) {
    navegation.push('/')
    return null;
    }

    let usuarioLogado = JSON.parse(logado);
    return usuarioLogado;

    

}



export default function Conteudo() {
    const navegation = useHistory();
    let usuarioLogado = lerUsuarioQuelogou(navegation) || {};

    const[idAlterado, setIdAlterado ] = useState(0);
    const [chat, setChat] = useState([]);
    const [sala, setSala] = useState('');
    const [usu, setUsu] = useState(usuarioLogado.nm_usuario);
    const [msg, setMsg] = useState('');


    const loading = useRef(null);

    

  

    const validarResposta = (resp) => {
       

        if (!resp.erro)
            return true;
        toast.error(`${resp.erro}`);
        return false;
    }

    const carregarMensagens = async () => {
        loading.current.continuousStart();

        const mensagens = await api.listarMensagens(sala);
        if (validarResposta(mensagens))
            setChat(mensagens);

        loading.current.complete();
    }

    const enviarMensagem = async () => {

        if(idAlterado > 0) {
        const resp = await api.alterarMensagem(idAlterado, msg);
        if (!validarResposta(resp)) 
            return;
        toast.dark('💕 Mensagem Alterada com sucesso!');
        await carregarMensagens();
        setIdAlterado(0);
        setMsg("")
        } else {
            const resp = await api.inserirMensagem(sala, usu, msg);
        if (!validarResposta(resp)) 
            return;
        
        toast.dark('💕 Mensagem enviada com sucesso!');
        await carregarMensagens();
        
        }
        
    }
    
    const removerMsg = async (item) => {
       

        if(item.tb_usuario.nm_usuario !== usu)
        toast.error('Você não pode remover a mensagem da outra pessoa')
        else {
        const r = await api.removerMensagem(item.id_chat)
        if (!validarResposta(r)) 
            return;
        
        toast.dark('💕 Mensagem Removida com sucesso!');

        
        await carregarMensagens();
    }
}
    const editar = async (item) => {
        if(item.tb_usuario.nm_usuario !== usu)
        toast.error('Você não pode alterar a mensagem da outra pessoa')
        else {
        setMsg(item.ds_mensagem);
        setIdAlterado(item.id_chat);
        }
    }

    const banirr = async (item) => {
        const r = api.banir(item.id_usuario)
        toast.success('Usuario Banido com Sucesso')

        await carregarMensagens();
    }

    

    const inserirUsuario = async () => {
        const resp = await api.inserirUsuario(usu);
        if (!validarResposta(resp)) 
            return;
        
        toast.dark('💕 Usuário cadastrado!');
        await carregarMensagens();
    }

    const inserirSala = async () => {
        const resp = await api.inserirSala(sala);
        if (!validarResposta(resp)) 
            return;
        
        toast.dark('💕 Sala cadastrada!');
        await carregarMensagens();
    }
    
    return (
        <ContainerConteudo>
            <ToastContainer />
            <LoadingBar color="#fffff" ref={loading} />
            <div className="container-form">
                <div className="box-sala">
                    <div>
                        <div className="label">Sala</div>
                        <ChatInput value={sala} onChange={e => setSala(e.target.value)} />
                    </div>
                    <div>
                        <div className="label">Nick</div>
                        <ChatInput value={usu} readOnly={true} />
                    </div>
                    <div>
                        <ChatButton onClick={inserirSala}> Criar </ChatButton>
                        <ChatButton onClick={inserirUsuario}> Entrar </ChatButton>
                    </div>
                </div>
                <div className="box-mensagem">
                    <div className="label">Mensagem</div>
                    <ChatTextArea value={msg} onChange={e => setMsg(e.target.value)} />
                    <ChatButton onClick={enviarMensagem} className="btn-enviar"> Enviar </ChatButton>
                </div>
            </div>
            
            <div className="container-chat">
                
                <img onClick={carregarMensagens}
                   className="chat-atualizar"
                         src="/assets/images/atualizar.png" alt="" />
               
                <div className="chat">
                    {chat.map(x =>
                        <div key={x.id_chat}>
                            <div className="chat-message">

                                <div className="banir"> <img  onClick={ () => banirr(x) } src = "/assets/images/warning-weather-interface-outlined-symbol_icon-icons.com_54630.svg" /> </div>
                                 <div className= "edit"> <img onClick={ () => editar(x) } src = "/assets/images/edit_icon-icons.com_61193.svg" alt = "" /> </div>
                                 <div className="lixo"> <img  onClick={ () => removerMsg(x) } src = "/assets/images/lixo.svg" alt ="" /> </div>
                                
                                <div>({new Date(x.dt_mensagem.replace('Z', '')).toLocaleTimeString()})</div>
                                <div><b>{x.tb_usuario.nm_usuario}</b> fala para <b>Todos</b>:</div>
                                <div> {x.ds_mensagem} </div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        </ContainerConteudo>
    )
}
