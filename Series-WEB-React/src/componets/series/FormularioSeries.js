//Importações
import React, {
  Component
} from "react";
//Component está entre {} pois é a segunda importação da mesma biblioteca
import PubSub from "pubsub-js";

//Herdando da classe Component
class FormularioSeries extends Component {
  //construtor com o estado/state
  constructor() {
    super();
    this.stateInicial = {
      nome: "",
      ano_lancamento: "",
      temporadas: "",
      sinopse: ""
    };

    this.state = this.stateInicial;

    //
    PubSub.subscribe("editing", (msg, serie) => {
      //Add no stateInicial a série q deve ser editada recebida pela TabelaSeries
      this.setState(serie);
    });
  }

  /*
    3º Método chamado conforme o usuário digita na input 
    Formato de arrow function pois será necessário manipular o estado
    Recebe o evento da input como parâmetro
  */
  inputHadler = e => {
    //Resgata o nome e o value da input
    const {
      name,
      value
    } = e.target;
    //muda o estado de acordo com o nome da input
    this.setState({
      [name]: value
    });
  };

  enviarDados = async e => {
    // Impede que a função padrão do elemento seja realizada/q a pag recarregue
    e.preventDefault();
    //Passa o state p/ enviarDados do BoxSeries.js
    await this.props.enviarDados(this.state);
    this.setState(this.stateInicial); //analisar essa linha
    delete this.state.id; //analisar essa linha
  };

  render() {
    return ( <
      div className = "card" >
      <
      div className = "card-header" > Cadastro < /div> <
      div className = "card-body" >
      <
      form //Chamada da função enviarDados no submit do form
      method = "post"
      onSubmit = {
        this.enviarDados
      } >
      <
      div className = "form" >
      <
      div className = "form-group" >
      <
      label htmlFor = "nome" > Nome < /label> <
      input type = "text"
      id = "nome"
      name = "nome"
      className = "form-control"
      onChange = {
        this.inputHadler
      }
      //Conforme o usuário digita, add no state e no value
      //No modo "editing" podemos ver os dados da série
      value = {
        this.state.nome
      }
      /> <
      /div>

      <
      div className = "form-group" >
      <
      label htmlFor = "nome" > Lançamentos < /label> <
      input type = "text"
      id = "lancamento"
      className = "form-control"
      /* 1º Nome da input deve ser de acordo com 
        as propriedades do estado inicial */
      name = "ano_lancamento"
      //2º chamada do método inputHandler no evento da input
      onChange = {
        this.inputHadler
      }
      //4º Altera o value recebendo o que o usuário digita
      value = {
        this.state.ano_lancamento
      }
      /> <
      /div>

      <
      div className = "form-group" >
      <
      label htmlFor = "nome" > Temporadas < /label> <
      input type = "text"
      id = "temporadas"
      className = "form-control"
      name = "temporadas"
      onChange = {
        this.inputHadler
      }
      value = {
        this.state.temporadas
      }
      /> <
      /div>

      <
      div className = "form-group" >
      <
      label htmlFor = "nome" > Sinopse < /label> <
      textarea id = "sinopse"
      name = "sinopse"
      className = "form-control"
      onChange = {
        this.inputHadler
      }
      value = {
        this.state.sinopse
      } >
      < /textarea> <
      /div>

      <
      button className = "btn btn-success form-control mt-2"
      type = "submit" >
      Salvar <
      /button> <
      /div> <
      /form> <
      /div> <
      /div>
    );
  }
}

export default FormularioSeries;