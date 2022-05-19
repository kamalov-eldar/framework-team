import React from 'react';

import Painting from '../Paintings';
import Header from '../Header/Header';

import style from './app.module.scss';

const App = function App() {
  return (
    <div className={style.app}>
      <div className={style.container}>
        <Header />
        <Painting />
      </div>
    </div>
  );
};
export default App;
