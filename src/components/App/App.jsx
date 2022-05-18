import React from 'react';

import Painting from '../Paintings';
import Header from '../Header/Header';

import style from './app.module.scss';

function App() {
  return (
    <div className={style.App}>
      <div className={style.Container}>
        <Header className="App-header" />
        <Painting />
        <footer />
      </div>
    </div>
  );
}
export default App;
