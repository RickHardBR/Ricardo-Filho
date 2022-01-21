import axios from "axios";
import styled from "styled-components";
import swal from "sweetalert";
import img from "../images/fundo.jpg"
import { useHistory } from 'react-router-dom'

const Container = styled.div`
  font-size: 5vh;
  font-family: 'Roboto';
  color: #FDFDFD;
  text-align: center;
`
const Logo = styled.img`
  width:25vw;
`
const Background = styled.div`
position: relative;
background-color: #FFFFF0;
background-image: url(${img});
width: 100vw;
height: 100vh;
background-size: cover;
`
const Button = styled.div`
  cursor: pointer;

  .middle {
    position: absolute;
    width: 9vw;
    height: 2vh;
    top: 0%;
    /* left: 50%; */
    transform: translate(0%, -50%);
  }
  .btn {
    position: relative;
    display: block;
    color: white;
    font-size: 14px;
    font-family: 'Roboto';
    text-decoration: none;
    margin: 30px 0;
    border: 2px solid #8b4513;
    padding: 14px 20px;
    text-transform: uppercase;
    overflow: hidden;
    transition: 1s all ease;
  }
  .btn::before {
    background: #6495ed;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: all 0.6s ease;
  }

  .btn1::before {
    width: 0%;
    height: 100%;
  }

  .btn1:hover::before {
    width: 100%;
  }
`
export default function AppFP() {

  const history = useHistory()
  const goToList = () => {
    history.push('/List')
  }

  return (
    <Container>
      <Background>
     <div>
     Para o usuário se candidatar à viagens, página que vai ter o formulário de inscrição
     </div>
     <Button onClick={goToList}>
          <div className="middle btn btn1">Voltar</div>
        </Button>
      </Background>
    </Container>
  );
}