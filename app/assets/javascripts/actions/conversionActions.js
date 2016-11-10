'use strict'

import * as actionTypes from './actionTypes.js'
import * as programApi from '../api/programApi'
import * as conversionApi from '../api/conversionApi'
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

export function stepCopyProgramUpdateName(name) {
  return {
    'type': actionTypes.STEP_COPY_PROGRAM_UPDATE_NAME,
    name
  }
}

export function stepCopyProgramExecute(conversionId) {
  return function(dispatch, getState) {
    const { copyProgramParams } = getState()
    return conversionApi.stepCopyProgramExecute(conversionId, copyProgramParams).then(response => {
      const conversion = response.data
      dispatch(loadConversionSuccess(conversion))
    }).catch(error => {
      throw(error)
    })
  }
}

export function stepCompleted(conversionId, stepId) {
  return function(dispatch) {
    return conversionApi.stepCompleted(conversionId, stepId).then(response => {
      const conversion = response.data
      dispatch(loadConversionSuccess(conversion))
    }).catch(error => {
      throw(error)
    })
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
