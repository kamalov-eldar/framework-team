import {
  AUTHORS_URL, BASE_URL, LOCATIONS_URL, PAINTINGS_URL,
} from '../../constants/constants';
import getDataAPI from '../../utils/api';
import {
  SET_PAINTINGS,
  SET_COUNT_PAGES,
  SET_CURRENT_PAGE,
  SET_AUTHORS_AND_LOCATIONS,
  SET_LOCATIONS,
  SET_THEME,
} from './actionTypes';

const paintingsLimit = 12;
export const setLocationsAC = (locationsList) => ({
  type: SET_LOCATIONS,
  locationsList,
});

export const fetchAuthorsAndLocations = () => (dispatch) => {
  Promise.all([getDataAPI(AUTHORS_URL), getDataAPI(LOCATIONS_URL)])
    .then(([responseAuthors, responseLocations]) => {
      const authorsList = responseAuthors.map(({ id, name }) => ({
        id,
        name,
      }));
      const locationsList = responseLocations.map(({ id, location }) => ({
        id,
        name: location,
      }));
      // dispatch(setLocationsAC([{ id: 0, name: 'Location' }, ...locationsList]));
      dispatch({
        type: SET_AUTHORS_AND_LOCATIONS,
        authorsList: [{ id: 0, name: 'Author' }, ...authorsList],
        locationsList: [{ id: 0, name: 'Location' }, ...locationsList],
      });
      console.log('fetch AuthorsAndLocations');
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
  console.log('fetch Paintings start', { filter, numberPage });
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
  Promise.all([
    getDataAPI(`${PAINTINGS_URL}?${queryStr}`),
    getDataAPI(`${PAINTINGS_URL}?_page=${numberPage}&_limit=${paintingsLimit}${queryStr}`),
  ]).then(([responseCountPages, responsePaintings]) => {
    const totalPaintings = responseCountPages.length; // 33
    const countPages = Math.ceil(totalPaintings / paintingsLimit);
    dispatch(setCountPagesAC(countPages)); // установить кол-во страниц

    const paintingsList = responsePaintings.map(
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
    console.log('fetch Paintings Ends');
  });
};

export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
}); 
export const setThemeAC = (themeIsDark) => ({
  type: SET_THEME,
  themeIsDark,
});
