import { h, render, Component } from 'preact';

/** @jsx h */

export default class SearchBar extends Component {
  render({searchText, onChange}) {
    return <div class="ui form">
      <div class="field">
        <label>Search:</label>
        <input type="text" value={searchText} onChange={onChange}/>
      </div>
    </div>
  }
}
