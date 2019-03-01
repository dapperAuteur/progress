import React, { Component } from 'react';

import './App.css';
import Pages from './components/Pages/Pages';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Pages />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
