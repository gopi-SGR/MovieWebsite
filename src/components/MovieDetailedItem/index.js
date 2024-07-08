import './index.css'

import {BackgroundImgContainer} from './styledComponents'

const MovieDetailedItem = props => {
  const {movieDetails} = props
  const {
    backgroundImgUrl,
    genres,
    imageUrl,
    overview,
    releaseDate,
    rating,
    title,
    duration,
  } = movieDetails

  return (
    <div className="movie-detailed-container">
      <div className="movie-details-overview">
        <div className="movie-details-description">
          <img src={imageUrl} alt={title} className="move-image-url" />
          <div className="movie-description">
            <h1 className="movie-title">{title}</h1>
            <p className="movie-rating">Rating : {rating}</p>
            <div className="duration-genre-container">
              <p className="movie-duration">{duration} min</p>
              <ul className="genres-list">
                {genres.map(eachItem => (
                  <li className="genre-item" key={eachItem.id}>
                    {eachItem.name},
                  </li>
                ))}
              </ul>
            </div>
            <p className="movie-duration">
              Release Data : {`${new Date(releaseDate).toDateString()}`}
            </p>
          </div>
        </div>
        <h1 className="overview-heading">Overview</h1>
        <p className="overview-description">{overview}</p>
      </div>

      <BackgroundImgContainer bgUrl={backgroundImgUrl}></BackgroundImgContainer>
    </div>
  )
}

export default MovieDetailedItem
