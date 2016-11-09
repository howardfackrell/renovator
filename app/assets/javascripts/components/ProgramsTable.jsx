'use strict'

import React from 'react'

const ProgramRow = ({program, startConversion, loadConversion}) => {
  return (
    <tr key={program.programId}>
      <td>{program.programId} {program.name}</td>
      <td>
        <table>
          <tbody>
          {program.conversions.map((conversion) => {
            return (
              <tr key={conversion.id}>
                <td><a href="#" onClick={() => {loadConversion(conversion.id)}}>{conversion.programId} {conversion.name} </a></td>
              </tr>
            )
          })}
          <tr>
            <td><a href="#" onClick={() => {startConversion(program.stp, program.programId)}}>New Conversion</a></td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

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