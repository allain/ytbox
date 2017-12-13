import { h, Component } from 'preact'
import { connect } from 'preact-redux'

/** @jsx h */
class VideoPlayer extends Component {
  render({ video, playing, play, stop }) {
    return playing ? (
      <i class="large pause middle aligned icon" onClick={stop}>
        <iframe
          width="120"
          height="100"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          frameborder="0"
          gesture="media"
          allow="encrypted-media"
          style="display: none"
        />
      </i>
    ) : (
      <i onClick={play} class="large play middle aligned icon" />
    )
  }
}

function mapStateToProps({ playing }, { video }) {
  return { playing: video === playing }
}

function mapDispatchToProps(dispatch, { video }) {
  return {
    play: () => dispatch({ type: 'PLAY_VIDEO', payload: { video } }),
    stop: () => dispatch({ type: 'STOP_VIDEO' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer)
