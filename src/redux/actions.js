import searchYoutube from '../lib/search-youtube'
import downloadMp3 from '../lib/download-mp3'

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
      .then(downloaded => {
        dispatch({ type: 'DOWNLOAD_SUCCESS', payload: { video, download } })
        setTimeout(() => {
          window.location = '/download?id=' + video.id
        }, 250)
      })
      .catch(error =>
        dispatch({ type: 'DOWNLOAD_FAIL', payload: { video, error } })
      )
  }
}
