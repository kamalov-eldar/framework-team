import React, { useEffect, useMemo, useState } from 'react';
import queryString from 'query-string';
import { connect, useDispatch } from 'react-redux';
import clsnm from 'classnames';
import PropTypes from 'prop-types';

import { Select, Input, Range } from 'fwt-internship-uikit';

import { setCurrentPageAC, fetchPaintings } from '../../store/paintings/actions';

import style from './filters.module.scss';

function Filters({ authorsList, locationsList, currentPage, themeIsDark }) {
  const [filter, setFilter] = useState({
    author: 'Author',
    location: 'Location',
    name: '',
    from: '',
    before: '',
  });
  // пока не загружены все данные authors и locations
  const [isLoaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);

    if (!authorsList.length || !locationsList.length) {
      return;
    }
    // после проверки устанавливаем что данные загрузились
    setLoaded(true);

    // если в строке браузера query параметры
    if (!Object.keys(parsed).length) {
      return;
    }

    const authorFindedName = authorsList.find((item) => item.id === Number(parsed.authorId));

    const locationFindedName = locationsList.find((item) => item.id === Number(parsed.locationId));

    // установить фильтр
    setFilter({
      author: authorFindedName ? authorFindedName.name : 'Author',
      location: locationFindedName ? locationFindedName.name : 'Location',
      name: parsed.name ? parsed.name : '',
      from: parsed.from ? parsed.from : '',
      before: parsed.before ? parsed.before : '',
    });

    const page = Number(parsed.page);

    if (page) dispatch(setCurrentPageAC(page));
  }, [authorsList, locationsList, dispatch]);

  const authorFindedId = useMemo(() => {
    const athorFind = authorsList.find((item) => item.name === filter.author);
    return athorFind?.id > 0 ? athorFind.id : undefined;
  }, [authorsList, filter.author]);
  const locationFindedId = useMemo(() => {
    const locationFind = locationsList.find((item) => item.name === filter.location);
    return locationFind?.id > 0 ? locationFind.id : undefined;
  }, [locationsList, filter.location]);

  useEffect(() => {
    // если не загружены все данные authors и locations то не выполнится код ниже
    if (!isLoaded) {
      return;
    }
    dispatch(
      fetchPaintings(currentPage, {
        authorId: authorFindedId,
        locationId: locationFindedId,
        namePainting: filter.name,
        createdFrom: filter.from,
        createdBefore: filter.before,
      })
    );

    const queryStr = queryString.stringify(
      {
        authorId: authorFindedId,
        locationId: locationFindedId,
        page: currentPage > 1 ? currentPage : null,
        name: filter.name,
        from: filter.from,
        before: filter.before,
      },
      { skipNull: true, skipEmptyString: true }
    );
    if (isLoaded) {
      window.history.pushState(
        {},
        '',
        window.location.pathname + (queryStr.length ? `?${queryStr}` : '')
      );
    }
  }, [dispatch, currentPage, isLoaded, filter, authorFindedId, locationFindedId]);

  return (
    <div className={style.filters}>
      <div className={style.filterItem}>
        <Input
          value={filter.name}
          isDarkTheme={themeIsDark}
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setFilter((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
      </div>
      <div className={style.filterItem}>
        <Select
          options={authorsList}
          isDarkTheme={themeIsDark}
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
          options={locationsList}
          isDarkTheme={themeIsDark}
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
        <Range isDarkTheme={themeIsDark} onClose={() => {}}>
          <Input
            value={filter.from}
            className={clsnm(style.input__created, {
              [style.input__created_dark]: themeIsDark,
            })}
            type="text"
            placeholder="from"
            onChange={(e) =>
              setFilter((prevState) => ({
                ...prevState,
                from: e.target.value,
              }))
            }
          />
          <span className={style.range__line}> </span>
          <Input
            value={filter.before}
            className={clsnm(style.input__created, {
              [style.input__created_dark]: themeIsDark,
            })}
            type="text"
            placeholder="before"
            onChange={(e) =>
              setFilter((prevState) => ({
                ...prevState,
                before: e.target.value,
              }))
            }
          />
        </Range>
      </div>
    </div>
  );
}

Filters.defaultProps = {
  locationsList: [],
  authorsList: [],
  currentPage: 1,
  themeIsDark: false,
};
Filters.propTypes = {
  locationsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  authorsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  currentPage: PropTypes.number,
  themeIsDark: PropTypes.bool,
};
export default connect((store) => ({
  authorsList: store.authorsList,
  locationsList: store.locationsList,
  currentPage: store.currentPage,
  themeIsDark: store.themeIsDark,
}))(Filters);
