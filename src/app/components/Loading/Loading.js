import React from 'react';

// Images
import LoaderSymbol from '../../assets/icons/Spinner-1s-311px.svg';

import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-wrapper">
        <div className="d-flex justify-content-center">
          <img src={LoaderSymbol} alt="loader" />
        </div>
        <h5>Even geduld...</h5>
      </div>
    </div>
  )
};

export default Loading;