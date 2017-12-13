import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { search } from './store'

import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

/** @jsx h */
class Page extends Component {
  render({ searchText, search, videos }) {
    return (
      <div id="page" class="ui container">
        <header>
          <SearchBar searchText={searchText} onChange={search} />
        </header>
        <section>
          <SearchResults videos={videos} />
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const searchText = state.searchText
  const videos = state.results || []

  return { searchText, videos }
}

function mapDispatchToProps(dispatch) {
  return {
    search: e => dispatch(search(e.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
