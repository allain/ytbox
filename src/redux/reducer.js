const actions = {
  SEARCHING: (state, { searchText }) => ({
    ...state,
    searchText,
    results: [],
    status: 'searching'
  }),

  SEARCH_SUCCESS: (state, { results }) => ({ ...state, results }),

  SEARCH_FAIL: (state, { error }) => ({
    ...state,
    status: 'FAILED',
    results: []
  }),

  DOWNLOADING: (state, { video }) => ({
    ...state,
    downloading: [...state.downloading.filter(v => v.id !== video.id), video],
    failed: state.failed.filter(v => v.id !== video.id)
  }),

  DOWNLOAD_SUCCESS: (state, { video }) => ({
    ...state,
    downloaded: [...state.downloaded, video],
    downloading: state.downloading.filter(v => v.id !== video.id)
  }),

  DOWNLOAD_FAIL: (state, { video }) => ({
    ...state,
    downloading: state.downloading.filter(v => v.id !== video.id),
    failed: [...state.failed, video]
  }),

  PLAY_VIDEO: (state, { video }) => ({ ...state, playing: video }),

  STOP_VIDEO: state => ({
    ...state,
    playing: null
  })
}

export default (state, action) =>
  action && actions[action.type]
    ? actions[action.type](state, action.payload || {})
    : state
