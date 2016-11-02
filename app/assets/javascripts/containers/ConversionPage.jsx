'use strict'

import { connect } from 'react-redux'

import Conversion from '../components/Conversion'

const mapStateToProps = () => {
  return {
    conversionId : 12345
  }
}


const mapDispatchToProps = () => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Conversion)