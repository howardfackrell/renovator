'use strict'

import * as actionTypes from './actionTypes.js'
import * as programApi from '../api/programApi'

export function updateProgramStp(stp) {
    return {
        'type' : actionTypes.UPDATE_PROGRAM_STP,
        'stp' : stp
    };
}

export function loadProgramsSuccess(programs) {
    return {
        'type' : actionTypes.LOAD_PROGRAMS_SUCCESS,
        'programs' : programs
    };
}




export function findPrograms(stp) {
    return function(dispatch) {
        return programApi.getPrograms(stp).then( response => {
            let programs = response.data
            dispatch(loadProgramsSuccess(programs))
        }).catch(error => {
            throw(error)
        });
    }
}