import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ReactSlick from '../ReactSlick';
import FailureView from '../FailureView';
import Loading from '../Loading';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Originals = () => {
  const [originalsMoviesList, setOriginalsMoviesList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getOriginalsMovies();
  }, []);

  const getOriginalsMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const originalsMoviesApi = 'https://apis.ccbp.in/movies-app/originals';
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(originalsMoviesApi, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = fetchedData.results.map(eachMovie => ({
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }));
        setOriginalsMoviesList(updatedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error('Error fetching originals:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onClickRetry = () => {
    getOriginalsMovies();
  };

  const renderFailureView = () => <FailureView onClickRetry={onClickRetry} />;
  const renderLoadingView = () => <Loading />;
  const renderSuccessView = () => <ReactSlick moviesList={originalsMoviesList} />;

  const renderOriginalsCarousel = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div className="originals-container">
      {renderOriginalsCarousel()}
    </div>
  );
};

export default Originals;
