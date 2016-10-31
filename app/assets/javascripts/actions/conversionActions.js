'use strict'

import * as actionTypes from './actionTypes.js';

export function updateConversionStp(stp) {
    return {
        'type' : actionTypes.UPDATE_CONVERSION_STP,
        'stp' : stp
    };
}

