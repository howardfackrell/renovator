'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'
import configureStore from './store/index'

import ProgramSearch from './containers/ProgramSearchPage'
import Conversion from './containers/ConversionPage'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={ProgramSearch}/>
      <Route path="/conversion/:conversionId" component={Conversion}/>
    </Router>
  </Provider>
  ,
  document.getElementById('content')
)
