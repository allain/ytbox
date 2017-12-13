import { h, render, Component } from 'preact'
import { Provider, connect } from 'preact-redux'

import Page from './Page'

import store from './store'

window.store = store

/** @jsx h */
render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.body
)
