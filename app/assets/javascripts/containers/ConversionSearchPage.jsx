'use strict'

import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreators'


import ConversionSearch from '../components/ConversionSearch'


const mapStateToProps = (state, ownProps) => {
    return {
        conversionStp : state.conversionStp
    }
};


const mapDispatchToProps = (dispatch) => {
    return {

        updateStp : (event) => {
            let stp = event.target.value;
            dispatch(actions.updateConversionStp(stp))
        },

        findConversions : () => {
            alert ("Now its time to do a server call to get conversions for STP : " + dispatch.getState().programStp);
        },

        selectConversion : () => {
            alert("Go to the conversion page, and route to display the selected conversion")
        }

    }

};


export default connect(mapStateToProps, mapDispatchToProps)(ConversionSearch)