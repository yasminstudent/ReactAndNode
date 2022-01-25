import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../componets/home/Home";
import Login from "../componets/login/Login";
import Autores from "../componets/autores/Autores";
import BoxSeries from "../componets/series/BoxSeries";
import Navbar from "../componets/Navbar";
import { isSignedIn } from "../services/auth-service";

const NotFound = () => {
  return (
    <div>
      <h1>404 page not found</h1>
    </div>
  );
};

//Rotas privadas recebe o componente
const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest} //analisar linha
      render={(props) =>
        //Verifica se o usuário está logado
        //Se sim exibe o component
        isSignedIn() ? (
          <div>
            <Navbar />
            <Component {...props} />
          </div>
        ) : (
          //Caso contrário redireciona para a tela de login
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

//Função principal das rotas
const Routes = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoutes path="/series" component={BoxSeries} />
        <PrivateRoutes path="/autores" component={Autores} />
        <PrivateRoutes exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
