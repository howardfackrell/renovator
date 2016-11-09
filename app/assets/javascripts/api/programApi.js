'use strict'

import axios from 'axios'

export function getPrograms(stp) {
  return axios.get('/clients/' + stp + '/programs')
}

export function createConversion(stp, programId) {
  return axios.post('/conversion', {
    stp,
    programId
  })
}

export function loadConversion(id) {
  return axios.get('/conversion/' + id)
}