import { Container } from './styled'
import { ChatButton, ChatInput } from '../../components/outros/inputs'


export default function Login() {

    return (
        <Container>
            <div className="box">
                <div className="titulo">
                    <img src="/assets/images/logo-monkchat.png" alt="" />
                    <br />
                    MonkChat
                </div>
            </div>

            <div className="login">
                <div className="container-form">
                    <div className="form-row">
                        <div className="title">Faça seu Login</div>
                    </div>

                    <div className="form-row">
                        <div>
                            <div className="label">Login </div>
                            <ChatInput
                                style={{ border: '1px solid gray', fontSize: '1.5em' }}
                                />
                        </div>
                        <div>
                            <div className="label">Senha </div>
                            <ChatInput
                                type="password"
                                style={{ border: '1px solid gray', fontSize: '1.5em' }}
                                />
                        </div>
                        <div>
                            <ChatButton
                                style={{ fontSize: '1.2em'}}> Login </ChatButton>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    )
}
