'use strict'

import React, {PropTypes} from 'react'
import Menu from './Menu'
import ProgramsTable from './ProgramsTable'

const ProgramSearch = ({programs, updateStp, startConversion, loadConversion}) => {
  return (
    <div className="container-fluid">

      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <Menu />
          <div className="row">
            <div className="col-md-4 col-lg-2">
              <div className="form-group ">
                <input type="textbox" className="form-control" placeholder="Sold To Party Number"
                       onBlur={updateStp}/>
              </div>
            </div>
          </div>
          <div className="row">
            <ProgramsTable programs={programs} startConversion={startConversion} loadConversion={loadConversion} />
          </div>
        </div>
      </div>
    </div>
  )
}

ProgramSearch.propTypes = {
  programStp: PropTypes.string.isRequired,
  programs: PropTypes.array.isRequired,
  updateStp: PropTypes.func.isRequired,
  startConversion: PropTypes.func.isRequired,
  loadConversion: PropTypes.func.isRequired
}


export default ProgramSearch