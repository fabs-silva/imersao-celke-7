import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Menu from './components/Menu';

import { Home } from './pages/Home';
import { VisualizarAnuncio } from './pages/VisualizarAnuncio';
import { CadastrarAnuncio } from './pages/CadastrarAnuncio';
import { EditarAnuncio } from './pages/EditarAnuncio';

function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/visualizar-anuncio/:id" component={VisualizarAnuncio} />
          <Route path="/cadastrar-anuncio" component={CadastrarAnuncio} />
          <Route path="/editar-anuncio/:id" component={EditarAnuncio} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
