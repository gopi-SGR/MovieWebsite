import {Component} from 'react'

import Loader from 'react-loader-spinner'

import MovieDetailedItem from '../MovieDetailedItem'
import MovieCastDetails from '../MovieCastDetails'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class MovieDetailedPage extends Component {
  state = {movieDetailedItem: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovieDetailedItem()
  }

  getMovieDetailedItem = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=22e0a05eecc01b277956153ecae1b08c&language=en-US&page=1`,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        backgroundImgUrl:
          'https://image.tmdb.org/t/p/w500' + data.backdrop_path,
        genres: data.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        overview: data.overview,
        imageUrl: 'https://image.tmdb.org/t/p/w500' + data.poster_path,
        releaseDate: data.release_date,
        title: data.title,
        rating: parseInt(data.vote_average).toFixed(2),
        duration: data.runtime,
        id: data.id,
      }
      this.setState({
        movieDetailedItem: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMovieDetailedView = () => {
    const {movieDetailedItem} = this.state

    return (
      <>
        <MovieDetailedItem movieDetails={movieDetailedItem} />
        <h1 className="cast-heading">Cast</h1>
        <MovieCastDetails movieId={movieDetailedItem.id} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="img"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="content">
        We are having some trouble to complete your request.Please try again.
      </p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="100" width="100" />
    </div>
  )

  renderMoviesStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailedView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="movies-detailed-container">
          {this.renderMoviesStatus()}
        </div>
      </>
    )
  }
}

export default MovieDetailedPage
