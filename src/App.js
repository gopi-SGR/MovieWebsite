import {Component} from 'react'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MovieContext from './context/MovieContext'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import MovieDetailedPage from './components/MovieDetailedPage'

import './App.css'

class App extends Component {
  state = {searchInput: '', isSearchStatus: false, searchList: []}

  onChangeSearchInput = value => {
    this.setState({searchInput: value})
  }

  onEnterSearchResults = async event => {
    event.preventDefault()
    const {searchInput} = this.state
    if (searchInput === '') {
      this.setState({isSearchStatus: false})
    } else {
      this.setState({isSearchStatus: true})
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=22e0a05eecc01b277956153ecae1b08c&language=en-US&query=${searchInput}&page=1`,
      )
      const data = await response.json()
      if (response.ok) {
        const updatedData = data.results.map(eachItem => ({
          id: eachItem.id,
          title: eachItem.title,
          imageUrl: 'https://image.tmdb.org/t/p/w500/' + eachItem.poster_path,
          rating: parseFloat(eachItem.vote_average).toFixed(2),
        }))
        this.setState({searchList: updatedData})
      }
    }
  }

  render() {
    const {searchInput, isSearchStatus, searchList} = this.state
    console.log(searchInput)
    console.log(isSearchStatus)
    console.log(searchList)
    return (
      <MovieContext.Provider
        value={{
          searchInput,
          isSearchStatus,
          searchList,
          onChangeSearchInput: this.onChangeSearchInput,
          onEnterSearchResults: this.onEnterSearchResults,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route  path="/" component={PopularMovies} />
            <Route  path="/top-rated" component={TopRatedMovies} />
            <Route path="/upcoming" component={UpcomingMovies} />
            <Route exact path="/movies/:id" component={MovieDetailedPage} />
          </Switch>
        </BrowserRouter>
      </MovieContext.Provider>
    )
  }
}

export default App
