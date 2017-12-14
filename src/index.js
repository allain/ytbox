import { h, render } from 'preact'
import { Provider } from 'preact-redux'

import Page from './Page'

import store from './redux/store'

window.store = store

/** @jsx h */
render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.body
)
