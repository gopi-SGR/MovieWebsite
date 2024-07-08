import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class MovieCastDetails extends Component {
  state = {movieCastList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovieCastList()
  }

  getMovieCastList = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {movieId} = this.props
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=22e0a05eecc01b277956153ecae1b08c&language=en-US&page=1`,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.cast.map(eachCast => ({
        id: eachCast.cast_id,
        character: eachCast.character,
        name: eachCast.name,
        profileImageUrl:
          'https://image.tmdb.org/t/p/w500' + eachCast.profile_path,
      }))
      this.setState({
        movieCastList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCastList = () => {
    const {movieCastList} = this.state
    return (
      <>
        <ul className="movie-cast-list">
          {movieCastList.map(eachItem => (
            <li className="movie-cast-item" key={eachItem.id}>
              <img
                src={eachItem.profileImageUrl}
                alt={eachItem.name}
                className="profile-img"
              />
              <h1 className="name">{eachItem.name}</h1>
              <p className="character">Character:{eachItem.character}</p>
            </li>
          ))}
        </ul>
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
        return this.renderCastList()
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
        <div className="movies-cast-details-container">
          {this.renderMoviesStatus()}
        </div>
      </>
    )
  }
}

export default MovieCastDetails
