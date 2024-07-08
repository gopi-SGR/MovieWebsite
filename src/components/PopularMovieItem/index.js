import {Link} from 'react-router-dom'

import './index.css'

const PopularMovieItem = props => {
  const {movieDetails} = props
  const {id, title, imageUrl, rating} = movieDetails

  return (
    <li className="popular-movie-item" key={id}>
      <Link to={`/movies/${id}`} className="movie-nav-link">
        <img src={imageUrl} alt={title} className="movie-img" />
        <h1 className="movie-title">{title}</h1>
        <p className="movie-raating">Rating : {rating}</p>
      </Link>
    </li>
  )
}

export default PopularMovieItem
