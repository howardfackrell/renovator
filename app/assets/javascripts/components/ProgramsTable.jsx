'use strict'

import React from 'react'
import {Link} from 'react-router'

const ProgramRow = ({program}) => {
  return (
    <tr key={program.programId}>
      <td>{program.programId} {program.name}</td>
      <td>
        <table>
          <tbody>
          {program.conversions.map((conversion) => {
            const linkTo = '/conversion/' + conversion.id
            return (
              <tr key={conversion.id}>
                <td><Link to={linkTo}>{conversion.programId} {conversion.name} </Link></td>
              </tr>
            )
          })}
          <tr>
            <td><a href="#">New Conversion</a></td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

const ProgramsTable = ({programs}) => {

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
        return <ProgramRow key={program.programId} program={program}/>
      })}
      </tbody>
    </table>
  )

}

export default ProgramsTable