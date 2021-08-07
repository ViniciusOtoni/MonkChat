
import { Barra, ContainerCabecalho } from './styled'



export default function Cabecalho() {
    return (
        <ContainerCabecalho>
            <img src="/assets/images/logo-monkchat.png" alt="" />
            <Barra />
            <div className="titulo"> MonkChat </div>
        </ContainerCabecalho>
    )
}
