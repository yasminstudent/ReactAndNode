import styled, { keyframes, css } from 'styled-components';

//*********** Form
export const Form = styled.form`
  margin-top: 30px;
  /* Faz com que os elementos dentro do form fiquem lado a lado */
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

//*********** Rotate
const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

//*********** SubmitButton
export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  //Atribui loading a disabled
  disabled: props.loading,
}))`
  background-color: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  /* Alinha ao centro vertical e horizontal */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Caso loading/disabled for true  */
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      /* Adiciona uma animação ao ícone caso loading seja true */
      svg {
        /* Rotaciona a cada 2 segundos de forma linear e infinita */
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

//*********** List
export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    /* Faz com que os elementos dentro da li fiquem lado a lado */
    flex-direction: row;
    /* Deixa cada elemento nas extremidades (left e right) */
    justify-content: space-between;
    /* Alinha ao centro vertical */
    align-items: center;

    /* Aplica em todos exceto no primeiro */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
