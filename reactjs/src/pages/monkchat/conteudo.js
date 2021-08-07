
import { ContainerConteudo } from './conteudo.styled'
import { ChatButton, ChatInput, ChatTextArea } from '../../components/outros/inputs'


export default function Conteudo() {
    return (
        <ContainerConteudo>
            <div className="container-form">
                <div className="box-sala">
                    <div>
                        <div className="label">Sala</div>
                        <ChatInput />
                    </div>
                    <div>
                        <div className="label">Nick</div>
                        <ChatInput />
                    </div>
                    <div>
                        <ChatButton> Criar </ChatButton>
                        <ChatButton> Entrar </ChatButton>
                    </div>
                </div>
                <div className="box-mensagem">
                    <div className="label">Mensagem</div>
                    <ChatTextArea />
                    <ChatButton className="btn-enviar"> Enviar </ChatButton>
                </div>
            </div>
            
            <div className="container-chat">
                <img className="chat-atualizar" src="/assets/images/atualizar.png" alt="" />
                <div className="chat">
                    <div className="chat-message">
                        <div>(15:02:01)</div>
                        <div><b>Bruno</b> entrou na sala: ...</div>
                    </div>
                    <div className="chat-message">
                        <div>(15:02:01)</div>
                        <div><b>Bruno</b> fala para <b>Todos</b>:</div>
                        <div> E ae pessoal, blzz?! </div>
                    </div>
                </div>
            </div>
        </ContainerConteudo>
    )
}