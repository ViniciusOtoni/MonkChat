
import { Barra, ContainerCabecalho } from './styled'


import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom'

export default function Cabecalho() {

    const navegacao = useHistory();

    const logof = () => {
        Cookies.remove('usuario-logado')
        navegacao.push('/')
    }

    return (
        <ContainerCabecalho>
            <img src="/assets/images/logo-monkchat.png" alt="" />
            <Barra />
            <div className="titulo"> MonkChat </div>
            
            <div className="sair" onClick={logof}>  Sair </div> 
            <div className="porta" onClick={logof}> <img src = "/assets/images/exit_icon-icons.com_70975.svg" alt = "" /> </div>
      
        </ContainerCabecalho>
    )
}
