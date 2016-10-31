'use strict'

import * as actionType from "../actions/actionTypes.js"

export function programStp(state = '', action) {
    switch (action.type) {
        case actionType.UPDATE_PROGRAM_STP:
            return action.stp;

        default:
            return state;
    }
}

export function programs(state = [], action) {
    switch (action.type) {
        case actionType.LOAD_PROGRAMS_SUCCESS:
            return action.programs;

        default :
            return state;
    }
}
