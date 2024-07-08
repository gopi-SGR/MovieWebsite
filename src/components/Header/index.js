import {Link} from 'react-router-dom'

import MovieContext from '../../context/MovieContext'

import './index.css'

const Header = () => (
  <MovieContext.Consumer>
    {value => {
      const {searchInput, onChangeSearchInput, onEnterSearchResults} = value
      const onSearchInput = event => {
        onChangeSearchInput(event.target.value)
      }
      const onSubmitSearchInput = event => {
        onEnterSearchResults(event)
      }
      return (
        <div className="header-container">
          <div className="nav-container">
            <p className="website-text">MovieDb</p>
            <div className="nav-link-and-search-container">
              <ul className="nav-links-items">
                <li className="nav-link-item">
                  <Link to="/" className="nav-link">
                    Popular
                  </Link>
                </li>
                <li className="nav-link-item">
                  <Link to="/top-rated" className="nav-link">
                    Top Rated
                  </Link>
                </li>
                <li className="nav-link-item">
                  <Link to="/upcoming" className="nav-link">
                    Upcoming
                  </Link>
                </li>
              </ul>
              <form className="form-container" onSubmit={onSubmitSearchInput}>
                <input
                  placeholder="Search Movie Name"
                  className="custom-search"
                  type="search"
                  onChange={onSearchInput}
                  value={searchInput}
                />
                <button className="search-button" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default Header
