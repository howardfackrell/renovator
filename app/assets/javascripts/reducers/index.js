'use strict'

import {combineReducers} from 'redux'
import * as program from './programReducers'
import * as conversion from './conversionReducers'

const rootReducer = combineReducers({
  programStp: program.programStp,
  programs: program.programs,
  conversion: conversion.conversion,
  copyProgramParams: conversion.copyProgramParams
})

export default rootReducer