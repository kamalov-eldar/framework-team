import React from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  Pagination as PaginationUikit,
} from 'fwt-internship-uikit';

import {
  setCurrentPageAC,
} from '../../store/paintings/actions';

// eslint-disable-next-line react/prop-types
function Pagination({ themeIsDark, countPages, currentPage }) {
  const dispatch = useDispatch();

  return (
    <div>
      <PaginationUikit
        isDarkTheme={themeIsDark}
        pagesAmount={countPages}
        currentPage={currentPage}
        onChange={(numberPage) => {
          dispatch(setCurrentPageAC(numberPage));
        }}
      />
    </div>
  );
}
export default connect((store) => ({
  countPages: store.countPages,
  currentPage: store.currentPage,
  themeIsDark: store.themeIsDark,
}))(Pagination);
