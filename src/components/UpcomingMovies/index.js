import {Component} from 'react'

import Loader from 'react-loader-spinner'

import PopularMovieItem from '../PopularMovieItem'
import MovieContext from '../../context/MovieContext'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class UpcomingMovies extends Component {
  state = {upcomingMoviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUpcomingMoviesList()
  }

  getUpcomingMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=22e0a05eecc01b277956153ecae1b08c&language=en-US&page=1',
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.results.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        imageUrl: 'https://image.tmdb.org/t/p/w500/' + eachItem.poster_path,
        rating: parseFloat(eachItem.vote_average).toFixed(2),
      }))

      this.setState({
        upcomingMoviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {isSearchStatus, searchList} = value
          const renderUpcomingMovies = () => {
            const {upcomingMoviesList} = this.state
            let MoviesList = null
            if (isSearchStatus === true) {
              MoviesList = searchList
            } else {
              MoviesList = upcomingMoviesList
            }

            return (
              <ul className="popular-movies-list">
                {MoviesList.map(eachMovie => (
                  <PopularMovieItem movieDetails={eachMovie} key={eachMovie} />
                ))}
              </ul>
            )
          }

          const renderFailureView = () => (
            <div className="container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                className="img"
              />
              <h1 className="heading">Oops! Something Went Wrong</h1>
              <p className="content">
                We are having some trouble to complete your request.Please try
                again.
              </p>
              <button type="button" className="retry-button">
                Retry
              </button>
            </div>
          )

          const renderLoadingView = () => (
            <div className="container" data-testid="loader">
              <Loader
                type="ThreeDots"
                color="orange"
                height="100"
                width="100"
              />
            </div>
          )

          const renderPopularMoviesStatus = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderUpcomingMovies()
              case apiStatusConstants.failure:
                return renderFailureView()
              case apiStatusConstants.in_progress:
                return renderLoadingView()
            }
          }

          return (
            <>
              <Header />
              <div className="popular-movies-container">
                {renderPopularMoviesStatus()}
              </div>
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default UpcomingMovies
