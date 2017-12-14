import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import { download } from './redux/actions'

/** @jsx h */
class AudioDownloader extends Component {
  render({ video, download, status }) {
    if (status === 'downloaded')
      return (
        <div style="text-align: center">
          <i className={`large check middle aligned icon`} />
          Downloaded
        </div>
      )

    if (status === 'error')
      return (
        <i
          onClick={download}
          className={`audio-downloader large error middle aligned icon`}
        />
      )

    if (status === 'downloading') return <span />

    return (
      <button className="ui primary button" onClick={download}>
        <i className={`download icon`} />
        Download MP3
      </button>
    )
  }
}

function mapStateToProps({ downloading, downloaded, failed }, { video }) {
  let status
  if (downloading.find(v => v.id === video.id)) {
    status = 'downloading'
  } else if (downloaded.find(v => v.id === video.id)) {
    status = 'downloaded'
  } else if (failed.find(v => v.id === video.id)) {
    status = 'failed'
  }

  return {
    status
  }
}

function mapDispatchToProps(dispatch, { video }) {
  return {
    download: () => dispatch(download(video))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioDownloader)
