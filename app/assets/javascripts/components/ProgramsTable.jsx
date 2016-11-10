'use strict'

import React from 'react'
import ProgramRow from './ProgramRow'

const ProgramsTable = ({programs, startConversion, loadConversion}) => {

  return (
    <table className="table table-bordered table-hover">
      <thead>
      <tr>
        <td>Original Program</td>
        <td>Conversions in Progress</td>
      </tr>
      </thead>
      <tbody>
      {programs.map(program => {
        return <ProgramRow key={program.programId} program={program} startConversion={startConversion} loadConversion={loadConversion}/>
      })}
      </tbody>
    </table>
  )

}

export default ProgramsTable