//Importa o React e classe Component
import React, { Component } from "react";
import TechItem from "./TechItem";

class TechList extends Component {
  //Conceito: Uma variável que vai ser manipulada pelo componente é chamada de estado

  constructor() {
    super();
    //Conceito: State = estado do componente
    this.state = {
      newTech: "",
      techs: [],
    };
  }

  //************** Ciclo de vida dos componentes

  //Executado assim que o componente aparece em tela
  componentDidMount() {
    //Normalmente consumimos a API e preenchemos os estado aqui

    const techs = localStorage.getItem("techs");

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  //Executado sempre que houver alterações nas props ou estado
  //Recebe como parâmetro props e state anteriores
  componentDidUpdate(_, prevState) {
    //Verifica se existe uma alteração na tech
    if (prevState.techs !== this.state.techs) {
      /* Adiciona no localStorage uma propriedades chamada techs 
          que recebe o state.techs convertido em JSON */
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  //************** Ciclo de vida dos componentes

  /* Conceito: usamos Arrow function, pois precisamos 
     manipular o this por uma função própria/nossa */

  //Ação: Função chamada no evento da input e recebe o próprio
  handleInputChange = (e) => {
    //Conceito: O state só pode ser alterado pelo método setState

    //Ação: Adiciona o valor que o usuário digita em newTech
    this.setState({ newTech: e.target.value });
  };

  //Ação: Função chamada no submit do formulário
  handleSubmit = (e) => {
    //Ação: Impede que a pág recarregue no post do formulário
    e.preventDefault();

    /*Conceito :Para atualizar um estado é preciso recriá-lo do zero
      ... this.state.techs ~ pega o que já existe em techs */
    this.setState({
      //Ação: Concatena o que já existe com a nova tech
      techs: [...this.state.techs, this.state.newTech],
      newTech: "",
    });
  };

  //Ação: Função chamada no clique do botão remover e recebe o nome da tech
  handleDelete = (tech) => {
    /*Ação: Filtra o que já está em tech e retorna tudo que é diferente da 
      tech que deve ser removida */
    this.setState({ techs: this.state.techs.filter((t) => t !== tech) });
  };

  //Função que renderiza um elemento na tela
  render() {
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map((tech) => (
            /* A propriedade key faz o React funcionar mais
             rápido na manipulaçãod desses elementos */
            //Ação: chama a função TechItem e passa a propriedade tech
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          /* OnChange é o método que executado conforme 
           ocorre um novo evento (usuário digita/apaga) */
          onChange={this.handleInputChange}
          value={this.state.newTech}
        ></input>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

//Exporta a classe TechList
export default TechList;

/* Anotar no caderno 

LocalStorage é o banco de dados do navegador
*/
