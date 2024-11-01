import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import FailureView from '../FailureView'
import Loading from '../Loading'
import Header from '../Header'
import Footer from '../Footer'
import MovieDetailsLink from '../MovieDetailsLink'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Popular = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [popularMovieList, setPopularMovieList] = useState([])

  useEffect(() => {
    getPopularMovies()
  }, [])

  const getPopularMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const popularMovieApi = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(popularMovieApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      setPopularMovieList(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderSuccessView = () => (
    <ul className="popular-list">
      {popularMovieList.map(eachMovie => (
        <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
      ))}
    </ul>
  )

  const onClickRetry = () => {
    getPopularMovies()
  }

  const renderFailureView = () => <FailureView onClickRetry={onClickRetry} />

  const renderLoadingView = () => <Loading />

  const renderPopularPageView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="popular-container">
      <Header />
      {renderPopularPageView()}
      <Footer />
    </div>
  )
}

export default Popular
