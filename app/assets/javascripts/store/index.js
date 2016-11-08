'use strict'

import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import logger from '../milddleware/logger'
import {hashHistory} from 'react-router'


const routerMiddlewareFunc = routerMiddleware(hashHistory)

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, routerMiddlewareFunc, logger))
  return store
}