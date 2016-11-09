'use strict'

import { connect } from 'react-redux'
import * as conversionActions from '../actions/conversionActions'


import Conversion from '../components/Conversion'

const mapStateToProps = (state) => {
  return {
    conversionId : 12345,
    conversion : state.conversion
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    stepCompleted : (conversionId, stepId) => {
      dispatch(conversionActions.stepCompleted(conversionId, stepId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Conversion)