'use strict'

import React from 'react';
import { Link } from 'react-router';

const ProgramRow = ( {program} ) => {
    return (
        <tr key={program.programId}>
            <td>{program.programId} {program.name}</td>
            <td>
                <table>
                    {program.conversions.map( (conversion) => {
                    return (
                        <tr><td><a key={conversion.id} href="conversion">{conversion.programId} {conversion.name} </a></td></tr>
                    )})}
                <tr><td><a href="#" >New Conversion</a></td></tr>
                    </table>
            </td>
        </tr>
    )
}

const ProgramsTable = ({programs}) => {

    // if (programs && programs.length > 0) {
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
    // }
    // else {
    //     return <table />
    // }
}

export default ProgramsTable;