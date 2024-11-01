import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import Header from '../Header';
import FailureView from '../FailureView';
import Loading from '../Loading';
import MovieDetailsLink from '../MovieDetailsLink';
import Footer from '../Footer';

import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const MovieDetails = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [movieDetailsList, setMovieDetailsList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [similarMoviesList, setSimilarMoviesList] = useState([]);
  const [spokenLanguagesList, setSpokenLanguagesList] = useState([]);

  const { id } = useParams(); // Retrieve id from URL parameters

  // Wrap getMovieDetailsList in useCallback to prevent re-creation on every render
  const getMovieDetailsList = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get('jwt_token');
    const movieItemDetailsApi = `https://apis.ccbp.in/movies-app/movies/${id}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(movieItemDetailsApi, options);
      if (response.ok) {
        const data = await response.json();
        const updatedData = {
          ...data.movie_details,
          backdropPath: data.movie_details.backdrop_path,
          releaseDate: data.movie_details.release_date,
          ratingCount: data.movie_details.vote_count,
          ratingAverage: data.movie_details.vote_average,
          posterPath: data.movie_details.poster_path,
        };

        setMovieDetailsList([updatedData]);

        const genresData = data.movie_details.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        }));
        setGenresList(genresData);

        const similarMoviesData = data.movie_details.similar_movies.map(eachSimilar => ({
          id: eachSimilar.id,
          posterPath: eachSimilar.poster_path,
          title: eachSimilar.title,
        }));
        setSimilarMoviesList(similarMoviesData);

        const spokenLanguagesData = data.movie_details.spoken_languages.map(eachLanguage => ({
          id: eachLanguage.id,
          language: eachLanguage.english_name,
        }));
        setSpokenLanguagesList(spokenLanguagesData);

        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  }, [id]);

  useEffect(() => {
    getMovieDetailsList();
  }, [getMovieDetailsList]);

  const renderFailureView = () => <FailureView onClickRetry={getMovieDetailsList} />;

  const renderLoadingView = () => <Loading />;

  const renderSuccessView = () => {
    const movie = movieDetailsList[0];
    if (!movie) return null;

    const {
      adult,
      backdropPath,
      budget,
      overview,
      releaseDate,
      runtime,
      title,
      ratingAverage,
      ratingCount,
    } = movie;

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const movieRuntime = `${hours}h ${minutes}m`;
    const censorCertificate = adult ? 'A' : 'U/A';
    const releaseYear = format(new Date(releaseDate), 'yyyy');
    const movieReleaseDate = format(new Date(releaseDate), 'do MMMM Y');

    return (
      <>
        <div
          style={{ backgroundImage: `url(${backdropPath})` }}
          className="movie-details-home-page"
        >
          <Header />
          <div className="home-page-container">
            <h1 className="title">{title}</h1>
            <div className="movie-details">
              <p className="run-time">{movieRuntime}</p>
              <p className="censor">{censorCertificate}</p>
              <p className="release-year">{releaseYear}</p>
            </div>
            <p className="over-view">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="movie-information">
          <div className="movie-details-container">
            <div className="each-info">
              <h1 className="info-heading">Genres</h1>
              <ul className="list-items">
                {genresList.map(eachGenre => (
                  <li className="genre-name" key={eachGenre.id}>
                    <p>{eachGenre.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="each-info">
              <h1 className="info-heading">Audio Available</h1>
              <ul className="list-items">
                {spokenLanguagesList.map(eachLang => (
                  <li className="genre-name" key={eachLang.id}>
                    <p>{eachLang.language}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="each-info">
              <h1 className="info-heading">Rating Count</h1>
              <p className="genre-name">{ratingCount}</p>
              <h1 className="info-heading">Rating Average</h1>
              <p className="genre-name">{ratingAverage}</p>
            </div>
            <div className="each-info">
              <h1 className="info-heading">Budget</h1>
              <p className="genre-name">{budget}</p>
              <h1 className="info-heading">Release Date</h1>
              <p className="genre-name">{movieReleaseDate}</p>
            </div>
          </div>
          <div className="similar-movies-container">
            <h1 className="side-heading">More like this</h1>
            <div className="similar-movies-list">
              {similarMoviesList.map(eachMovie => (
                <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  };

  const renderMovieDetailsView = () => {
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

  return <>{renderMovieDetailsView()}</>;
};

export default MovieDetails;
