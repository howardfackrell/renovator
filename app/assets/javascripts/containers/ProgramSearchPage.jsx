'use strict'

import React from 'react'
import { connect } from 'react-redux'
import * as programActions from '../actions/programActions'


import ProgramSearch from '../components/ProgramSearch'


const mapStateToProps = (state, ownProps) => {
    return {
        programStp : state.programStp,
        programs : state.programs
    }
};


const mapDispatchToProps = (dispatch) => {
    return {

        updateStp : (event) => {
            let stp = event.target.value;
            dispatch(programActions.updateProgramStp(stp));
            dispatch(programActions.findPrograms(stp));
        },

        startConversion : (event) => {
            alert("start the conversion, and route to display that conversion for "+ stp + "/" + programId)
        }

    }

};


export default connect(mapStateToProps, mapDispatchToProps)(ProgramSearch)