import React, { Component } from 'react';
import Colonne from './Colonne';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h1>Liste de questions</h1>
       <Colonne titre="En cours d'apprentissage" />
      </div>
    );
  }
}

export default App;
