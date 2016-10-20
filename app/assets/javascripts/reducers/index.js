'use strict'

import { combineReducers } from 'redux'
import * as program from './programReducers'
import * as conversion from './conversionReducers'

const rootReducer = combineReducers({
    programStp : program.programStp,
    conversionStp : conversion.conversionStp,
});

export default rootReducer