'use strict'

import axios from 'axios'

export function getPrograms(stp) {
  return axios.get('/clients/' + stp + '/programs')
}