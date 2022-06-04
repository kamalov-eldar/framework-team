import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Paintings from '../Paintings';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import Pagination from '../Pagination';

import {
  fetchAuthorsAndLocations,
} from '../../store/paintings/actions';
import style from './app.module.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthorsAndLocations());
  }, [dispatch]);

  return (
    <div className={style.app}>
      <div className={style.container}>
        <Header />
        <Filters />
        <Paintings />
        <Pagination />
      </div>
    </div>
  );
}
export default App;
