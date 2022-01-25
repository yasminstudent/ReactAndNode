//Importações de dependecias
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

//Impotações de arquivos
import api from '../../services/api';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/container';

//Classe Main que herda da classe Component
export default class Main extends Component {
  //Método construtor
  constructor() {
    super();
    //Estado
    this.state = {
      //Lista de repositórios
      repositories: [],
      //Novo repositório
      newRepo: '',
      //Carregamento dos dados da Api
      loading: false,
    };
  }

  /* Carrega dados do Localstorage e salva em repositories
     Lembrete: método executado assim que o componente é renderizado na tela */

  componentDidMount() {
    //Atribui a constante os dados do localStorage
    const repositories = localStorage.getItem('repositories');

    //Verifica se existe repositórios salvos
    if (repositories) {
      //Adiciona no state os repositórios, convertendo para JSON antes
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  //Salva respositorios no localstorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    //Verifica se houve alterações no state
    if (prevState.repositories !== repositories) {
      //Salva o estado atual no localstorage, convertendo para string antes
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  //Método chamado no evento da input
  handleInputChange = (e) => {
    //Add em newRepo o novo repositório
    this.setState({ newRepo: e.target.value });
  };

  //Método chamado no submit do formulário
  handleSubmit = async (e) => {
    //Evita que o evento padrão (página ser regarregada) aconteça
    e.preventDefault();

    //Indica que o carregamento dos dados do repositório será executado
    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    //Requisição da api (retorno guardado em response)
    const response = await api.get(`/repos/${newRepo}`);

    //Salvo nesse formato para facilitar caso desejamos resgatar outros dados
    const data = {
      //Guarda o nome do repositório
      name: response.data.full_name,
    };

    this.setState({
      //Add na lista de repositório o que já existia + o novo repositório
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form
          //chamada do métodono submit do formulário
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="Adicionar Repositório"
            /* Inicialmente vazio, recebe o que o usuário digita
               durante esse evento
               Obs: para carregar dados do repositório o usário deve digitar:
               nome-autor/nome-repositorio
            */
            value={newRepo}
            //Chamada do método no evento da input
            onChange={this.handleInputChange}
          />

          <SubmitButton
            //Passa para esse componente a propriedade loading
            loading={loading}
          >
            {
              //Se for true (caso esteja carregando) exibe o icon de carregamento
              loading ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                //se for false exibe o icon de +
                <FaPlus color="#fff" size={14} />
              )
            }
          </SubmitButton>
        </Form>

        <List>
          {
            //mapeia a lista de repositórios
            repositories.map((repository) => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link
                  to={
                    /* Link para a página repository ~ que recebe o nome do
                       repositório comp parâmetro
                       encodeURIComponent - transforma a / em outro caracter
                    */
                    `/repository/${encodeURIComponent(repository.name)}`
                  }
                >
                  Detalhes
                </Link>
              </li>
            ))
          }
        </List>
      </Container>
    );
  }
}
