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
              <tr key={conversion.programId}>
                <td><a id={`link_${conversion.programId}`} href="#" onClick={() => {
                  loadConversion(conversion.id)
                }}>{conversion.programId} {conversion.name}</a></td>
              </tr>
            )
          })}
          <tr>
            <td><a href="#" onClick={() => {
              startConversion(program.stp, program.programId)
            }}>New Conversion</a></td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

export default ProgramRow