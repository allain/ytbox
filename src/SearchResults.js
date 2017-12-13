import { h, Component } from 'preact'

import SearchResult from './SearchResult'

/** @jsx h */
class SearchResults extends Component {
  render({ videos }) {
    return (
      <div class="ui cards">{videos.map(v => <SearchResult video={v} />)}</div>
    )
  }
}

export default SearchResults
