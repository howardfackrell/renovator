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
