import { Component } from 'react';
import Cookies from 'js-cookie';
import FailureView from '../FailureView';
import Loading from '../Loading';
import TrendingNow from '../TrendingNow';
import Originals from '../Originals';
import Header from '../Header';
import Footer from '../Footer';

import searchErrorImg from '../../Assets/search-error.png';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    randomHomePagePoster: {},
    searchResultsList: [],
    isSearching: false,
    searchValue: '',
    searchApiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getRandomHomePagePoster();
  }

  getRandomHomePagePoster = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const jwtToken = Cookies.get('jwt_token');
    const homeApi = 'https://apis.ccbp.in/movies-app/trending-movies';
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(homeApi, options);

    if (response.ok === true) {
      const data = await response.json();
      const fetchedData = data.results.map((eachMovie) => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
      }));
      const randomNumber = Math.floor(Math.random() * fetchedData.length);

      const randomMovie = fetchedData[randomNumber];
      this.setState({
        randomHomePagePoster: randomMovie,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  getSearchMoviesData = async (searchValue) => {
    this.setState({ searchApiStatus: apiStatusConstants.inProgress, isSearching: true });

    const jwtToken = Cookies.get('jwt_token');
    const searchApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`;
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${jwtToken}` },
    };

    const response = await fetch(searchApi, options);

    if (response.ok) {
      const data = await response.json();
      const fetchedSearchMoviesData = data.results.map((eachMovie) => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
      }));

      if (fetchedSearchMoviesData.length === 0) {
        this.setState({
          searchResultsList: [],
          searchApiStatus: apiStatusConstants.failure,
        });
      } else {
        this.setState({
          searchResultsList: fetchedSearchMoviesData,
          searchApiStatus: apiStatusConstants.success,
        });
      }
    } else {
      this.setState({ searchApiStatus: apiStatusConstants.failure });
    }
  };

  renderSearchResults = () => {
    const { searchResultsList, searchApiStatus } = this.state;
  
    switch (searchApiStatus) {
      case apiStatusConstants.success:
        return (
          <ul className="search-items">
            {searchResultsList.map((movie) => (
              <li key={movie.id} className="movie-card">
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="movie-poster"
                />
              </li>
            ))}
          </ul>
        );
      case apiStatusConstants.failure:
        return (
          <div className="no-results-view">
            <img src={searchErrorImg} className="search-error" alt="search error" />
          </div>
        );
      case apiStatusConstants.inProgress:
        return <Loading />;
      default:
        return null;
    }
  };
  
  handleSearch = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });

    if (value.trim() !== '') {
      this.getSearchMoviesData(value);
    } else {
      this.setState({ isSearching: false, searchResultsList: [] });
    }
  };

  render() {
    const { isSearching, randomHomePagePoster, apiStatus, searchValue } = this.state;

    return (
      <div className="bg-container">
        <Header getSearchMoviesData={this.getSearchMoviesData} />
        <div className="search-bar-container">
          <input
            type="text"
            value={searchValue}
            placeholder="Search for movies..."
            className="search-input"
            onChange={this.handleSearch}
          />
        </div>
        {isSearching ? (
          <div className="search-results-container">{this.renderSearchResults()}</div>
        ) : (
          <>
            {apiStatus === apiStatusConstants.success && (
              <div
                style={{
                  backgroundImage: `url(${randomHomePagePoster.backdropPath})`,
                }}
                className="home-page"
              >
                <div className="home-page-movie-container">
                  <h1 className="movie-title">{randomHomePagePoster.title}</h1>
                  <p className="overview">{randomHomePagePoster.overview}</p>
                  <button type="button" className="play-btn">
                    Play
                  </button>
                </div>
              </div>
            )}
            {apiStatus === apiStatusConstants.failure && <FailureView />}
            {apiStatus === apiStatusConstants.inProgress && <Loading />}
            <h1 className="side-heading">Trending Now</h1>
            <TrendingNow />
            <h1 className="side-heading">Originals</h1>
            <Originals />
          </>
        )}
        <Footer />
      </div>
    );
  }
}

export default Home;
