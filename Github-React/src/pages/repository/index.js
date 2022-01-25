//Importações de dependecias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Impotações de arquivos
import api from '../../services/api';
import { Loading, Owner, IssueList } from './styles.js';
import Container from '../../components/container';

//Classe Repository que herda de Component
export default class Repository extends Component {
  //Definindo os tipos das propriedades recebidas
  static propTypes = {
    //Tipo objeto
    match: PropTypes.shape({
      params: PropTypes.shape({
        //Tipo string (pois é o nome do repositório)
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  //Cosntrutor
  constructor() {
    super();
    //Estado
    this.state = {
      //Objeto repositório
      repository: {},
      //Lista de issues do repositório
      issues: [],
      //Carregamento dos dados da Api
      loading: true,
    };
  }

  //Método executado assim que o componente é redenrizado
  async componentDidMount() {
    //Resgata match das propriedades recebidas
    const { match } = this.props;

    //decodeURIComponent coloca a barra novamente na string
    //Guarda na constante o nome do repositório
    const repoName = decodeURIComponent(match.params.repository);

    //Faz ambas requisições ao mesmo tempo
    //Guarda o retorno da primeira em repository e o retorno da segunda em issues
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        //Pega somente 5 das que estão em aberto (não resolvidas)
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      //Add em repository o retorno da 1º req.data
      repository: repository.data,
      //Add em issues o retorno da 2º req.data
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    //Verifica se os dados da Api estão carregando
    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/"> Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p> {repository.description} </p>
        </Owner>

        <IssueList>
          {
            //Mapeia a lista de issues
            issues.map((issue) => (
              <li
                key={
                  //Transforma o id em string (boa prática)
                  String(issue.id)
                }
              >
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {
                      //mapeia as labels
                      issue.labels.map((label) => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))
                    }
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          }
        </IssueList>
      </Container>
    );
  }
}
