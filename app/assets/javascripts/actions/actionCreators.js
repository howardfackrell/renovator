'use strict'

import * as actionTypes from './actionTypes.js';

export function updateProgramStp(stp) {
    return {
        'type' : actionTypes.UPDATE_PROGRAM_STP,
        'stp' : stp
    };
}

export function updateConversionStp(stp) {
    return {
        'type' : actionTypes.UPDATE_CONVERSION_STP,
        'stp' : stp
    };
}
