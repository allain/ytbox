import { h, Component } from 'preact'

import { connect } from 'preact-redux'

import VideoPlayer from './VideoPlayer'
import AudioDownloader from './AudioDownloader'

/** @jsx h */

class SearchResult extends Component {
  render({ video, status, progress }) {
    // console.log(video)
    return (
      <div class="ui card">
        <div class="image">
          <img src={`http://img.youtube.com/vi/${video.id}/0.jpg`} />
        </div>
        <div class="content">
          <a class="header">{video.title}</a>
          <div class="meta">
            <span class="date">Joined in 2013</span>
          </div>
          <div class="description">
            <VideoPlayer video={video} />
            {video.description}
          </div>
        </div>
        <div class="extra content">
          <AudioDownloader video={video} />
          {status === 'downloading' && (
            <div class="ui progress">
              <div
                class="bar"
                style={{
                  width: Math.round(progress) + '%'
                }}>
                <div class="progress">{Math.round(progress)}%</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, { video }) {
  const { downloading, downloaded, failed } = state

  let status = 'undefined'
  let progress = -1

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

  return { status, progress }
}

export default connect(mapStateToProps)(SearchResult)
