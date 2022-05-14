import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { connect } from "react-redux";
import clsnm from "classnames";

import Line from "./images/Line.svg";

//import PropTypes from "prop-types";
import { Select } from "fwt-internship-uikit";
import { Range } from "fwt-internship-uikit";
import { Input } from "fwt-internship-uikit";
import { Pagination } from "fwt-internship-uikit";

import PaintingsList from "../../components/Paintings/PaintingsList";

import {
  setCurrentPageAC,
  fetchAuthors,
  fetchPaintings,
  fetchLocations,
} from "../../store/paintings/actions";

import style from "./Paintings.module.scss";

const Paintings = () => {
  const [author, setAuthor] = useState("Author");
  const [location, setLocation] = useState("Location");
  const [namePainting, setNamePainting] = useState("");
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdBefore, setCreatedBefore] = useState("");

  const dispatch = useDispatch();

  //const state = useStore().getState();

  const storeData = useSelector((store) => {
    return {
      authorsList: store.authorsList,
      locationsList: store.locationsList,
      paintingsList: store.paintingsList,
      countPages: store.countPages,
      currentPage: store.currentPage,
      themeIsDark: store.themeIsDark,
    };
  });

  useEffect(() => {
    const authorFinded = storeData.authorsList.find((item) => {
      return item.name === author;
    });
    const locationFinded = storeData.locationsList.find((item) => {
      return item.name === location;
    });
    dispatch(
      fetchPaintings(storeData.currentPage, {
        authorId: authorFinded?.id,
        locationId: locationFinded?.id,
        namePainting: namePainting,
        createdFrom: createdFrom,
        createdBefore: createdBefore,
      })
    );
    // ??
    //
  }, [storeData.currentPage, author, location, namePainting, createdFrom, createdBefore]);

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, []);

  //  https://test-front.framework.team/paintings?_page=1&_limit=12

  // https://test-front.framework.team/paintings?_page=1&_limit=12&created_gte=1400&created_lte=1500

  const onNamePaintingChange = (e) => {
    setNamePainting(e.target.value);
  };

  return (
    <div>
      <div className={style.filters}>
        <Input
          value={namePainting}
          isDarkTheme={storeData.themeIsDark}
          type="text"
          placeholder="Name"
          onChange={onNamePaintingChange}
        />
        <Select
          options={storeData.authorsList}
          isDarkTheme={storeData.themeIsDark}
          value={author}
          onChange={(authorName) => {
            setAuthor(authorName);
            dispatch(setCurrentPageAC(1));
          }}
        />
        <Select
          options={storeData.locationsList}
          isDarkTheme={storeData.themeIsDark}
          value={location}
          onChange={(locationName) => {
            dispatch(setCurrentPageAC(1));
            setLocation(locationName);
          }}
        />
        <Range
          /*  children="Name" */
          isDarkTheme={storeData.themeIsDark}
          placeholder="Name"
          onClose={() => {}}
        >
          <Input
            value={createdFrom}
            className={clsnm(style.input__created, {
              [style.input__created_dark]: storeData.themeIsDark,
            })}
            type="text"
            placeholder="from"
            onChange={(e) => setCreatedFrom(e.target.value)}
          />
          <span className={style.range__line}>
            <img src={Line} alt="line" />
          </span>
          <Input
            value={createdBefore}
            className={clsnm(style.input__created, {
              [style.input__created_dark]: storeData.themeIsDark,
            })}
            type="text"
            placeholder="before"
            onChange={(e) => setCreatedBefore(e.target.value)}
          />
        </Range>
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

/* Paintings.propTypes = {
  setErrorGetAPI: PropTypes.func,
}; */
//export default withErrorGetAPI(Paintings);
export default Paintings; // connect((state) => state)(Paintings); // Paintings;
