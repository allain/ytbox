import { h, Component } from 'preact'

/** @jsx h */

export default class SearchBar extends Component {
  render({ searchText, onChange }) {
    return (
      <div className="ui form center aligned search-bar">
        <div className="field">
          <input
            type="text"
            value={searchText}
            onChange={onChange}
            placeholder="Search for Music"
          />
        </div>
      </div>
    )
  }
}
