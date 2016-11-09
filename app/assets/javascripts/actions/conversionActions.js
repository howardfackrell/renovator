'use strict'

import * as actionTypes from './actionTypes.js'
import * as programApi from '../api/programApi'
import {push} from 'react-router-redux'

export function updateConversionStp(stp) {
  return {
    'type': actionTypes.UPDATE_CONVERSION_STP,
    'stp': stp
  }
}

export function loadConversionSuccess(conversion) {
  return {
    'type': actionTypes.LOAD_CONVERSION_SUCCESS,
    conversion
  }
}

export function loadConversion(id) {
  return function (dispatch) {
    return programApi.loadConversion(id).then(response => {
      const conversion = response.data
      dispatch(loadConversionSuccess(conversion))
      dispatch(push('/conversion/' + conversion.id))
    }).catch(error => {
      throw(error)
    })
  }
}
