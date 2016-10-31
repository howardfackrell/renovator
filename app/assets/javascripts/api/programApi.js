'use strict'

import axios from 'axios'



// axios.get('/clients/' + stp + '/programs')
//     .then( response => {
//         dispatch(programActions.updatePrograms(response.data))
//     });

export function getPrograms(stp) {
    return axios.get('/clients/' + stp + '/programs')
}