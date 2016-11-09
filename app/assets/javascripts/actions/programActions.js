'use strict'

import * as actionTypes from './actionTypes.js'
import * as programApi from '../api/programApi'
import {push} from 'react-router-redux'

export function updateProgramStp(stp) {
  return {
    'type': actionTypes.UPDATE_PROGRAM_STP,
    'stp': stp
  }
}

export function loadProgramsSuccess(programs) {
  return {
    'type': actionTypes.LOAD_PROGRAMS_SUCCESS,
    'programs': programs
  }
}


export function findPrograms(stp) {
  return function (dispatch) {
    return programApi.getPrograms(stp).then(response => {
      const programs = response.data
      dispatch(loadProgramsSuccess(programs))
    }).catch(error => {
      throw(error)
    })
  }
}

export function createNewConversion(stp, programId) {
  return function (dispatch) {
    programApi.createConversion(stp, programId)
      .then(response => {
        const conversionId = response.data
        dispatch(push('/conversion/' + conversionId))
      })
      .catch( error => {
        throw(error)
      })
  }
}