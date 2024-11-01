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

const TrendingNow = () => {
  const [trendingMoviesList, setTrendingMoviesList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    console.log("Component Mounted");
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const TrendingMoviesApi = 'https://apis.ccbp.in/movies-app/trending-movies';
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    try {
        const response = await fetch(TrendingMoviesApi, options);
        console.log('API Response:', response);
        if (response.ok) {
            const fetchedData = await response.json();
            console.log('Fetched Data:', fetchedData); 
            const updatedData = fetchedData.results.map((eachMovie) => ({
                id: eachMovie.id,
                posterPath: eachMovie.poster_path,
                title: eachMovie.title,
            }));
            setTrendingMoviesList(updatedData);
            setApiStatus(apiStatusConstants.success);
        } else {
            console.error('Failed to fetch movies'); 
            setApiStatus(apiStatusConstants.failure);
        }
    } catch (error) {
        console.error('Error fetching movies:', error); 
        setApiStatus(apiStatusConstants.failure);
    }
};


  const onClickRetry = () => {
    getTrendingMovies();
  };

  const renderFailureView = () => <FailureView onClickRetry={onClickRetry} />;
  const renderLoadingView = () => <Loading />;
  const renderSuccessView = () => (
    <>
      <ReactSlick moviesList={trendingMoviesList} />
    </>
  );

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
    <div className="trending-container">
      {renderOriginalsCarousel()}
    </div>
  );
};

export default TrendingNow;
