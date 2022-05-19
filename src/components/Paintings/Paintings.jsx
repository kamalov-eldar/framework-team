import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import clsnm from 'classnames';

import {
  Select, Input, Pagination, Range,
} from 'fwt-internship-uikit';

import PaintingsList from '../PaintingsList/PaintingsList';

import {
  setCurrentPageAC,
  fetchAuthors,
  fetchPaintings,
  fetchLocations,
} from '../../store/paintings/actions';

import style from './paintings.module.scss';

const Paintings = function Paintings() {
  const [filter, setFilter] = useState({
    author: 'Author',
    location: 'Location',
    name: '',
    from: '',
    before: '',
  });
  const [isLoaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const storeData = useSelector((store) => ({
    authorsList: store.authorsList,
    locationsList: store.locationsList,
    paintingsList: store.paintingsList,
    countPages: store.countPages,
    currentPage: store.currentPage,
    themeIsDark: store.themeIsDark,
  }));

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    if (!storeData.authorsList.length || !storeData.locationsList.length) {
      return;
    }
    const authorFindedName = storeData.authorsList.find((item) => (
      item.id === Number(parsed.authorId)));
    const locationFindedName = storeData.locationsList.find((item) => (
      item.id === Number(parsed.locationId)));
    setFilter({
      author: authorFindedName ? authorFindedName.name : 'Author',
      location: locationFindedName ? locationFindedName.name : 'Location',
      name: parsed.name ? parsed.name : '',
      from: parsed.from ? parsed.from : '',
      before: parsed.before ? parsed.before : '',
    });
    const page = Number(parsed.page);
    if (page) dispatch(setCurrentPageAC(page));
    setLoaded(true);
  }, [storeData.authorsList, storeData.locationsList, dispatch]);

  useEffect(() => {
    const authorFinded = storeData.authorsList.find((item) => item.name === filter.author);
    const locationFinded = storeData.locationsList.find((item) => item.name === filter.location);

    dispatch(fetchPaintings(storeData.currentPage, {
      authorId: authorFinded?.id,
      locationId: locationFinded?.id,
      namePainting: filter.name,
      createdFrom: filter.from,
      createdBefore: filter.before,
    }));
    const queryStr = queryString.stringify({
      authorId: authorFinded?.id > 0 ? authorFinded?.id : null,
      locationId: locationFinded?.id > 0 ? locationFinded?.id : null,
      page: storeData.currentPage > 1 ? storeData.currentPage : null,
      name: filter.name,
      from: filter.from,
      before: filter.before,
    }, { skipNull: true, skipEmptyString: true });
    if (isLoaded) {
      window.history.pushState({}, '', window.location.pathname + (queryStr.length ? `?${queryStr}` : ''));
    }
  }, [dispatch, storeData.authorsList, storeData.countPages, storeData.currentPage,
    storeData.locationsList, isLoaded, filter]);

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div>
      <div className={style.filters}>
        <div className={style.filterItem}>
          <Input
            value={filter.name}
            isDarkTheme={storeData.themeIsDark}
            type="text"
            placeholder="Name"
            onChange={(e) => setFilter((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))}
          />
        </div>
        <div className={style.filterItem}>
          <Select
            options={storeData.authorsList}
            isDarkTheme={storeData.themeIsDark}
            value={filter.author}
            onChange={(authorName) => {
              setFilter((prevState) => ({
                ...prevState,
                author: authorName,
              }));
              dispatch(setCurrentPageAC(1));
            }}
          />
        </div>
        <div className={style.filterItem}>
          <Select
            options={storeData.locationsList}
            isDarkTheme={storeData.themeIsDark}
            value={filter.location}
            onChange={(locationName) => {
              dispatch(setCurrentPageAC(1));
              setFilter((prevState) => ({
                ...prevState,
                location: locationName,
              }));
            }}
          />
        </div>
        <div className={style.filterItem}>
          <Range
            isDarkTheme={storeData.themeIsDark}
            onClose={() => {}}
          >
            <Input
              value={filter.from}
              className={clsnm(style.input__created, {
                [style.input__created_dark]: storeData.themeIsDark,
              })}
              type="text"
              placeholder="from"
              onChange={(e) => setFilter((prevState) => ({
                ...prevState,
                from: e.target.value,
              }))}
            />
            <span className={style.range__line}> </span>
            <Input
              value={filter.before}
              className={clsnm(style.input__created, {
                [style.input__created_dark]: storeData.themeIsDark,
              })}
              type="text"
              placeholder="before"
              onChange={(e) => setFilter((prevState) => ({
                ...prevState,
                before: e.target.value,
              }))}
            />
          </Range>
        </div>

      </div>
      <div className={style.container}>
        {storeData.paintingsList ? (
          <PaintingsList
            locationsList={storeData.locationsList}
            authorsList={storeData.authorsList}
            paintingsList={storeData.paintingsList ?? []}
          />
        ) : null}
      </div>
      <Pagination
        className={style.pagination}
        isDarkTheme={storeData.themeIsDark}
        pagesAmount={storeData.countPages}
        currentPage={storeData.currentPage}
        onChange={(numberPage) => {
          dispatch(setCurrentPageAC(numberPage));
        }}
      />
    </div>
  );
};

export default Paintings;
