//Importe das dependências
import styled from 'styled-components';

//constante container que passa a ser uma div
const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    /* Faz os itens ficarem lado a lado e centralizados verticalmente */
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

//Exporta a constante
export default Container;
