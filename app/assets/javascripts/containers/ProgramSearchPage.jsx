'use strict'

import {connect} from 'react-redux'
import * as programActions from '../actions/programActions'
import ProgramSearch from '../components/ProgramSearch'


const mapStateToProps = (state) => {
  return {
    programStp: state.programStp,
    programs: state.programs
  }
}


const mapDispatchToProps = (dispatch) => {
  return {

    updateStp: (event) => {
      const stp = event.target.value
      dispatch(programActions.updateProgramStp(stp))
      dispatch(programActions.findPrograms(stp))
    }
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ProgramSearch)