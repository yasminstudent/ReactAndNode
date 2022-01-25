import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      signOut: false
    };
  }

  render() {
    //Se estiver true redireciona para login
    if (this.state.signOut) {
      return <Redirect to="/login/" />;
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link className="navbar-brand" to="/series">
          SERIES
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link
                //rota
                className="nav-link"
                to="/"
              >
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/series">
                Series
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/autores">
                Autores
              </Link>
            </li>
          </ul>

          <button
            className="btn btn-danger my-2 my-sm-0"
            onClick={() => {
              //No clique do botão starta como true o signOut (sair)
              this.setState({ signOut: true });
            }}
          >
            Sair
          </button>
        </div>
      </nav>
    );
  }
}
