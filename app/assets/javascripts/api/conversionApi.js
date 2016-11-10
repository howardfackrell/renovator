'use strict'

import axios from 'axios'

export function stepCopyProgramExecute(conversionId, programCopyParams) {
  return axios.post(`/conversion/${conversionId}/copyProgram`, programCopyParams)
}

export function stepCompleted(conversionId, stepId) {
  return axios.post('/conversion/' + conversionId + '/step/' + stepId + '/completed')
}