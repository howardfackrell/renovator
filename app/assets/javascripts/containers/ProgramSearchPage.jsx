'use strict'

import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreators'


import ProgramSearch from '../components/ProgramSearch'


const mapStateToProps = (state, ownProps) => {
    return {
        programStp : state.programStp
    }
};


const mapDispatchToProps = (dispatch) => {
    return {

        updateStp : (event) => {
            let stp = event.target.value;
            dispatch(actions.updateProgramStp(stp))
        },

        findPrograms : () => {
            alert ("Now its time to do a server call to get programs for STP : " + dispatch.getState().programStp);
        },

        startConversion : () => {
            alert("start the conversion, and route to display that conversion")
        }

    }

};


export default connect(mapStateToProps, mapDispatchToProps)(ProgramSearch)