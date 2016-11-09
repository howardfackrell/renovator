'use strict'

import { connect } from 'react-redux'

import Conversion from '../components/Conversion'

const mapStateToProps = (state) => {
  return {
    conversionId : 12345,
    conversion : state.conversion
  }
}


const mapDispatchToProps = () => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Conversion)