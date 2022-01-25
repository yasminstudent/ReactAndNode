//Importações de dependecias
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Impotações de arquivos
import Main from './pages/main';
import Repository from './pages/repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch //garante que apenas uma rota seja chamada por momento
      >
        <Route
          path="/"
          //Exact diz que a rota deve ser examente essa e
          //não apenas começar dessa maneira
          exact
          component={Main}
        />
        <Route
          //Essa rota recebe como parâmetro o nome de um repositório
          path="/repository/:repository"
          exact
          component={Repository}
        />
      </Switch>
    </BrowserRouter>
  );
}
