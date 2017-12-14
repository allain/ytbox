import { h, Component } from 'preact'
import { connect } from 'preact-redux'

/** @jsx h */
class AudioPlayer extends Component {
  render({ video, playing, stop, play }) {
    return (
      <div className="audio-player" onClick={playing ? stop : play}>
        {playing ? (
          <i className="large pause middle aligned icon">
            <iframe
              width="120"
              height="100"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              gesture="media"
              allow="encrypted-media"
              style="display: none"
            />
          </i>
        ) : (
          <i className="large play middle aligned icon" />
        )}
      </div>
    )
  }
}

function mapStateToProps({ playing }, { video }) {
  return { playing: video === playing }
}

export default connect(mapStateToProps)(AudioPlayer)
