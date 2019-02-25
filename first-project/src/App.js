// import des dépendances
import React, { Component } from 'react';// Import de react et de "component" que l'on peut voir comme un nouveau type d'objet ?
import Welcome from './Welcome';
import logo from './logo.svg';
import './App.css';

/* class App extends Component {
  render() { //un component doit être rendu pour être visible
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload!!!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tu apprends React !!!
          </a>
        </header>
      </div>
    );
  }
} */
/* class Hello extends Component {
  return <h1>Hello </h1>;
} */
class App extends Component {
  render() { //un component doit être rendu pour être visible
    return (
      <Welcome firstname="Bob" name="Dylan" />
    );
  }
}
const sara = <App name="Sara" />;

// export permet ensuite d'importer (ici depuis index.js)
export default App;

