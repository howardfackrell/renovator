'use strict'

import * as actionType from '../actions/actionTypes.js'

export function conversionStp(state = '', action) {
  switch (action.type) {
    case actionType.UPDATE_CONVERSION_STP:
      return action.stp

    default:
      return state
  }
}