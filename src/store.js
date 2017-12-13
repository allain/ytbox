import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import searchYoutube from './lib/search-youtube'
import downloadMp3 from './lib/download-mp3'

const INITIAL = {
  searchText: 'Test',
  results: [],
  playing: null,
  downloading: [],
  downloaded: [],
  failed: []
}

export const ACTIONS = {
  SEARCHING: (state, { payload }) => {
    const { searchText } = payload
    return { ...state, searchText, results: [], status: 'searching' }
  },

  SEARCH_SUCCESS: (state, { payload }) => {
    const { results } = payload
    return { ...state, results }
  },

  SEARCH_FAIL: (state, { payload }) => {
    const { error } = payload
    console.error(error)
    return { ...state, status: 'FAILED', results: [] }
  },

  DOWNLOADING: (state, { payload }) => {
    const { video } = payload

    return {
      ...state,
      downloading: [...state.downloading.filter(v => v.id !== video.id), video],
      failed: state.failed.filter(v => v.id !== video.id)
    }
  },

  DOWNLOAD_SUCCESS: (state, { payload }) => {
    const { video } = payload

    return {
      ...state,
      downloaded: [...state.downloaded, video],
      downloading: state.downloading.filter(v => v.id !== video.id)
    }
  },

  DOWNLOAD_FAIL: (state, { payload }) => {
    const { video } = payload

    return {
      ...state,
      downloading: state.downloading.filter(v => v.id !== video.id),
      failed: [...state.failed, video]
    }
  },

  PLAY_VIDEO: (state, { payload }) => {
    const { video } = payload
    return { ...state, playing: video }
  },

  STOP_VIDEO: state => {
    return { ...state, playing: null }
  }
}

export function search(searchText) {
  return (dispatch, getState) => {
    dispatch({ type: 'SEARCHING', payload: { searchText } })

    return searchYoutube(searchText)
      .then(results =>
        dispatch({ type: 'SEARCH_SUCCESS', payload: { searchText, results } })
      )
      .catch(error =>
        dispatch({
          type: 'SEARCH_FAIL',
          payload: { error, searchText }
        })
      )
  }
}

export function download(video) {
  return (dispatch, getState) => {
    dispatch({ type: 'DOWNLOADING', payload: { video } })
    return downloadMp3(video.id, ({ progress }) => {
      dispatch({
        type: 'DOWNLOADING',
        payload: { video: { ...video, progress } }
      })
    })
      .then(downloaded =>
        dispatch({ type: 'DOWNLOAD_SUCCESS', payload: { video, download } })
      )
      .catch(error =>
        dispatch({ type: 'DOWNLOAD_FAIL', payload: { video, error } })
      )
  }
}

export default createStore(
  (state, action) => {
    console.log(action)
    return action && ACTIONS[action.type]
      ? ACTIONS[action.type](state, action)
      : state
  },
  INITIAL,
  applyMiddleware(thunk)
)
