import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import { download } from './store'

/** @jsx h */
class AudioDownloader extends Component {
  render({ video, download, status }) {
    if (status === 'downloaded')
      return <i class={`audio-downloader large check middle aligned icon`} />

    if (status === 'error')
      return (
        <i
          onClick={download}
          class={`audio-downloader large error middle aligned icon`}
        />
      )

    if (status === 'downloading') return <span />

    return (
      <i
        onClick={download}
        class={`audio-downloader large download middle aligned icon`}
      />
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
