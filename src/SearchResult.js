import { h, Component } from 'preact'

import { connect } from 'preact-redux'

import AudioPlayer from './AudioPlayer'
import AudioDownloader from './AudioDownloader'

/** @jsx h */

class SearchResult extends Component {
  render({ video, status, progress, playing, stop, play }) {
    // console.log(video)
    return (
      <div className="ui card">
        <div className="image" onClick={playing ? stop : play}>
          <AudioPlayer video={video} />
          <img src={`http://img.youtube.com/vi/${video.id}/hqdefault.jpg`} />
        </div>
        <div className="content">
          <div className="header">{video.title}</div>
        </div>
        <div className="extra content" style="text-align: center">
          <AudioDownloader video={video} />
          {status === 'downloading' && (
            <div className="ui progress">
              <div
                className="bar"
                style={{
                  width: Math.round(progress) + '%'
                }}>
                <div className="progress">{Math.round(progress)}%</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, { video }) {
  const { downloading, downloaded, failed, playing } = state

  let status = 'undefined'
  let progress = -1
  const isPlaying = playing === video

  if (downloaded.find(v => v.id === video.id)) {
    progress = -1
    status = 'downloaded'
  } else if (failed.find(v => v.id === video.id)) {
    status = 'failed'
  } else if (downloading.find(v => v.id === video.id)) {
    const p = downloading.find(v => v.id === video.id)
    progress = p.progress ? p.progress.percentage : 0
    status = 'downloading'
  }

  return { status, progress, playing: isPlaying }
}

function mapDispatchToProps(dispatch, { video }) {
  return {
    play: () => dispatch({ type: 'PLAY_VIDEO', payload: { video } }),
    stop: () => dispatch({ type: 'STOP_VIDEO' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)
