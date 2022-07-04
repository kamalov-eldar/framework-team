import React from 'react';

import PaintingsList from '../PaintingsList/PaintingsList';

import style from './Paintings.module.scss';

function Paintings() {

  return (
    <div>
      <div className={style.container}>
        <PaintingsList />
      </div>

    </div>
  );
}

export default Paintings;
