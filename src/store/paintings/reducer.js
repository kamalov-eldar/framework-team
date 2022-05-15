import {
  SET_PAINTINGS,
  SET_CURRENT_PAGE,
  SET_COUNT_PAGES,
  SET_LOCATIONS,
  SET_AUTHORS,
  SET_THEME,
} from './actionTypes';

const initialState = {
  paintingsList: [],
  authorsList: [],
  locationsList: [],
  countPages: 0,
  currentPage: 1,
  themeIsDark: false,
};
// const state = initialState;

const paintingsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PAINTINGS: {
      return {
        ...state,
        paintingsList: action.payload,
      };
    }
    case SET_AUTHORS: {
      return {
        ...state,
        authorsList: action.authorsList,
      };
    }
    case SET_LOCATIONS: {
      return {
        ...state,
        locationsList: action.locationsList,
      };
    }
    // установить текущую стр
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    // установить кол-во страниц
    case SET_COUNT_PAGES: {
      return { ...state, countPages: action.countPages };
    }
    // установить тему
    case SET_THEME: {
      return { ...state, themeIsDark: action.themeIsDark };
    }
    default:
      return state;
  }
};

export default paintingsReducer;
