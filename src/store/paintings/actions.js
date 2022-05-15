import {
  AUTHORS_URL, BASE_URL, LOCATIONS_URL, PAINTINGS_URL,
} from '../../constants/constants';
import getDataAPI from '../../utils/api';
import {
  SET_PAINTINGS,
  SET_COUNT_PAGES,
  SET_CURRENT_PAGE,
  SET_AUTHORS,
  SET_LOCATIONS,
  SET_THEME,
} from './actionTypes';

const paintingsLimit = 12;
export const setAuthorsAC = (authorsList) => ({
  type: SET_AUTHORS,
  authorsList,
});

export const fetchAuthors = () => (dispatch) => {
  getDataAPI(AUTHORS_URL).then((response) => {
    const authorsList = response.map(({ id, name }) => ({
      id,
      name,
    }));
    dispatch(setAuthorsAC([{ id: 0, name: 'Author' }, ...authorsList]));
  });
};

export const setLocationsAC = (locationsList) => ({
  type: SET_LOCATIONS,
  locationsList,
});

export const fetchLocations = () => (dispatch) => {
  getDataAPI(LOCATIONS_URL).then((response) => {
    const locationsList = response.map(({ id, location }) => ({
      id,
      name: location,
    }));
    dispatch(setLocationsAC([{ id: 0, name: 'Location' }, ...locationsList]));
  });
};

export const setPaintingsAC = (paintingsList) => ({
  type: SET_PAINTINGS,
  payload: paintingsList,
});
export const setCountPagesAC = (countPages) => ({
  type: SET_COUNT_PAGES,
  countPages,
});

export const fetchPaintings = (numberPage = 1, filter = {}) => (dispatch) => {
  let queryStr = '';
  if (filter.locationId) {
    queryStr += `&locationId=${filter.locationId}`;
  }
  if (filter.authorId) {
    queryStr += `&authorId=${filter.authorId}`;
  }
  if (filter.namePainting) {
    queryStr += `&q=${filter.namePainting}`;
  }
  if (filter.createdFrom && filter.createdBefore) {
    queryStr += `&created_gte=${filter.createdFrom}&created_lte=${filter.createdBefore}`;
  }

  getDataAPI(`${PAINTINGS_URL}?${queryStr}`).then((response) => {
    const totalPaintings = response.length; // 33
    const countPages = Math.ceil(totalPaintings / paintingsLimit);
    dispatch(setCountPagesAC(countPages)); // установить кол-во страниц
  });

  getDataAPI(`${PAINTINGS_URL}?_page=${numberPage}&_limit=${paintingsLimit}${queryStr}`).then(
    (response) => {
      const paintingsList = response.map(
        ({
          name, imageUrl, id, created, authorId, locationId,
        }) => {
          const pictureUrl = BASE_URL + imageUrl;
          return {
            name,
            pictureUrl,
            id,
            created,
            authorId,
            locationId,
          };
        },
      );
      dispatch(setPaintingsAC(paintingsList));
    },
  );
};

export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setThemeAC = (themeIsDark) => ({
  type: SET_THEME,
  themeIsDark,
});
