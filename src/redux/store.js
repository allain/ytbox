import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

const INITIAL = {
  searchText: '',
  results: [],
  playing: null,
  downloading: [],
  downloaded: [],
  failed: []
}

export default createStore(reducer, INITIAL, applyMiddleware(thunk))
