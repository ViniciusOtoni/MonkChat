
import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    background-color: #583BBF;
    color: #fff;
    padding: 2em 5em 6em 5em;

    font-family: Montserrat;
    min-height: 100vh;
    min-width: 1200px;

    @media (max-width: 400px) {
        min-width: auto;
        padding: 1em;
        font-size: .9em;
    }
`



export { Container }