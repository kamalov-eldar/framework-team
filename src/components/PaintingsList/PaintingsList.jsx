import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import style from './paintingsList.module.scss';

function PaintingsList({ paintingsList, locationsList, authorsList }) {
  /* console.log('{ paintingsList, locationsList, authorsList }: ',
    { paintingsList, locationsList, authorsList }); */

  const paintings = paintingsList.map((itemPainting) => {
    // console.log('map', itemPainting);
    const authorFinded = authorsList.find((item) => item.id === itemPainting.authorId);
    const locationFinded = locationsList.find((item) => item.id === itemPainting.locationId);
    if (authorFinded && locationFinded) {
      return {
        ...itemPainting,
        author: authorFinded.name,
        location: locationFinded.name,
      };
    }
    return itemPainting;
  });
  // console.log('render-PaintingsList');
  return (
    <div className={style.list}>
      {paintings.map((painting) => (
        <div className={style.item} key={painting.id}>
          <div className={style.picture}>
            <img src={painting.pictureUrl} alt={painting.name} />
          </div>
          <div className={style.info}>
            <div className={style.info__title}>{painting.name}</div>
            <div className={style.info__author}>
              Author:
              <span className={style.author__text}>
                {painting.author}
              </span>
            </div>
            <div className={style.info__created}>
              Created:
              <span className={style.created__text}>
                {painting.created}
              </span>
            </div>
            <div className={style.info__location}>
              Location:
              <span className={style.location__text}>
                {painting.location}
              </span>
            </div>
          </div>
          <div className={style.title}>{painting.name}</div>
        </div>
      ))}
    </div>
  );
}

PaintingsList.defaultProps = {
  paintingsList: [],
  locationsList: [],
  authorsList: [],
};
PaintingsList.propTypes = {
  paintingsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      pictureUrl: PropTypes.string,
      name: PropTypes.string,
      authorId: PropTypes.number,
      locationId: PropTypes.number,
    }),
  ),
  locationsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  authorsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};

export default connect((state) => ({
  paintingsList: state.paintingsList,
  locationsList: state.locationsList,
  authorsList: state.authorsList,
}))(PaintingsList);
