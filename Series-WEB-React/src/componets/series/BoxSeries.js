import React, { Component } from "react";
import FormularioSeries from "./FormularioSeries";
import TabelaSeries from "./TabelaSeries";
import { getToken } from "../../services/auth-service";
import {
  listar,
  inserir,
  atualizar,
  remover
} from "../../services/series-service";

class BoxSeries extends Component {
  constructor() {
    super();
    //Lista de séries
    this.state = {
      series: []
    };
  }

  /* Executado assim que o componente é redenrizado na tela */
  async componentDidMount() {
    try {
      //chamada da função listar (que chama a função que faz a requisição)
      const retorno = await listar();
      //transforma o retorno da requisição em JSON
      const series = await retorno.json();
      //Atualiza o estado passando o JSON das séries
      this.setState({ series: series });
    } catch (erro) {
      console.log(erro);
    }
  }

  /* 
    Recebe a série (state em FormularioSeries.js)
      Vazia, caso seja uma nova (e sem o id)
  */
  enviarDados = async serie => {
    try {
      let retorno = "";

      //Verifica se a série é nova ou existente, verificando o id
      if (serie.id) {
        //Chamada do método que chama a requisição p/ att
        retorno = await atualizar(serie);
      } else {
        //Chamada do método que chama a requisição p/ add
        retorno = await inserir(serie);
      }

      //Verifica se houve sucesso ao inserir ~ 201 Created
      if (retorno.status === 201) {
        return this.setState({
          //Reescreve séries adicionando o que tinha antes + a nova e retorna
          series: [...this.state.series, serie],
          //Retorna o state com a nova série
          serie: this.novaSerie //analisar essa linha
        });
      }

      //Verifica se houve sucesso ao atualizar ~ 200 Ok
      if (retorno.status === 200) {
        console.log(serie);
        this.setState({
          /*
            Mapeia a lista de séries, 
            localiza pelo id a série que deve ser mudada 
            e substitue na lista de séries do state,
            a antiga pela que foi recebida (serie)
          */
          series: this.state.series.map(s => (s.id == serie.id ? serie : s)),
          serie: this.novaSerie //analisar essa linha
        });
        console.log(this.state.series);
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  deleta = async id => {
    //Guarda a listagem atual das séries
    const seriesAtual = this.state.series;

    //Chamada da função remover passando o id
    //a função remover chama a doRequest e essa faz a requisição
    const retorno = await remover(id);

    //Verifica se a requisição foi bem sucedida
    if (retorno.status === 204) {
      //Atualiza o estado
      this.setState({
        /* 
            filtra a lista das séries retornando todas que possuem o id 
            diferente do id da série que foi excluída

            desse modo o array de séries recebe as mesmas séries exceto a excluída
        */
        series: seriesAtual.filter(serie => {
          return serie.id !== id;
        })
      });
    }
  };

  //Renderiza o Formulário e a Tabela com as séries
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <FormularioSeries
              //Passa a esse componente a propriedade enviarDados que recebe a
              enviarDados={this.enviarDados} //arrow function enviarDados
            />
          </div>
          <div className="col-md-8">
            <TabelaSeries
              //Passa a esse componente as propriedades:
              series={this.state.series}
              deleta={this.deleta} //arrow function deleta
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BoxSeries;
