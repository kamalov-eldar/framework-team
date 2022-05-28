import React from 'react';

import PaintingsList from '../PaintingsList/PaintingsList';

import style from './paintings.module.scss';

function Paintings() {
  // console.log('render-Paintings');

  return (
    <div>
      <div className={style.container}>
        <PaintingsList />
      </div>

    </div>
  );
}

export default Paintings;
