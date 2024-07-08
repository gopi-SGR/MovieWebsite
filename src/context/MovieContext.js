import React from 'react'

const MovieContext = React.createContext({
  searchInput: '',
  onChangeSearchInput: () => {},
  onEnterSearchResults: () => {},
  isSearchStatus: false,
  searchList: [],
})

export default MovieContext
