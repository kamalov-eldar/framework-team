import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setThemeAC } from '../../store/paintings/actions';

import logo from './images/logo.svg';
import btnDark from './images/btn-dark.svg';
import btnLight from './images/btn-light.svg';

import style from './header.module.scss';

const Header = function Header() {
  const dispatch = useDispatch();

  const themeIsDark = useSelector((state) => state.themeIsDark);

  if (themeIsDark) {
    document.body.style = 'background: black;';
  } else {
    document.body.style = 'background: ;';
  }

  const toggleTheme = () => {
    dispatch(setThemeAC(!themeIsDark));
  };
  return (
    <div className={style.header}>
      <div className={style.header__container}>
        <span className={style.header__logo}>
          <img src={logo} alt="Logo" />
        </span>

        <span className={style.header__theme__btn} onClick={toggleTheme}>
          {themeIsDark ? (
            <img src={btnLight} alt="Button light" />
          ) : (
            <img src={btnDark} alt="Button dark" />
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
