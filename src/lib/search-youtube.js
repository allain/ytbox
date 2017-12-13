export default searchText =>
  fetch('/search?q=' + encodeURIComponent(searchText)).then(res => res.json())
