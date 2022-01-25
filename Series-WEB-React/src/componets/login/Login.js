import React, { Component } from "react";
import { signIn } from "../../services/auth-service";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Fica no html dá pag e recebe a msgErro do state
const MsgErro = (props) => {
  //Verifica se existe uma mensagem
  if (props.mensagem) {
    //Retorna uma div exibindo o erro
    return <div className="alert alert-danger">{props.mensagem}</div>;
  }
  //Caso não exista não retorna nada
  else return "";
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      senha: "",
      msgErro: "",
    };
  }

  //Função chamada no evento das inputs
  //recebe o evento
  inputHandler = (e) => {
    //Resgata o nome e valor
    const { name, value } = e.target;
    //Salva o valor da input no state
    this.setState({ [name]: value });
  };

  //Função chamada no submit do form, recebe o evento
  signIn = async (e) => {
    try {
      //Evita que a pág seja recarregada
      e.preventDefault();
      //Pega o state e guarda em usuário
      const usuario = this.state;
      //Deleta a msgErro que estava no state
      delete usuario.msgErro;

      //Chama a função que faz a requisição e
      // guarda o retorno em retorno
      const retorno = await signIn(usuario);

      //Verifica se o retorno da requisição foi 400
      if (retorno.status === 400) {
        //Pega a mensagem de erro do retorno
        const erro = await retorno.json();
        //Salva a mensgaem de erro no state
        this.setState({ msgErro: erro.erro });
      }

      //Verifica se o retorno da requisição foi ok
      if (retorno.ok) {
        //Direciona / busca a pág home
        this.props.history.push("/");
      }
    } catch (e) {
      //Caso dê errado exibe o erro no console
      console.log(e);
    }
  };

  render() {
    return (
      <div className="body">
        <form className="form-signin" onSubmit={this.signIn}>
          <img
            className="mb-4"
            src="../../assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <MsgErro mensagem={this.state.msgErro} />
          <label for="inputEmail" className="sr-only">
            Email address
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            onChange={this.inputHandler}
          />

          <label for="inputPassword" className="sr-only">
            Password
          </label>

          <input
            type="password"
            id="senha"
            name="senha"
            className="form-control"
            placeholder="Password"
            required
            onChange={this.inputHandler}
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}

export default Login;
