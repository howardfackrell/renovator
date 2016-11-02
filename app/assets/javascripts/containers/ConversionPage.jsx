'use strict'

import React from 'react'
import { connect } from 'react-redux'

import Conversion from '../components/Conversion'


const mapStateToProps = (state, ownProps) => {
    return {
        conversionId : 12345
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Conversion)