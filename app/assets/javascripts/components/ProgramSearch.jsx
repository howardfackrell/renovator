'use strict'

import React, { PropTypes } from 'react'
import Menu from './Menu'

const ProgramSearch = (props) => {
    return (
        <div className="container-fluid">
            <Menu />
            <div className="row">
                <div className="col-md-offset-1">
                    <div className="form-group" >
                        <label className="col-form-label" htmlFor="stp">STP:</label>
                        <input type="textbox" onBlur={props.updateStp}/>
                        <label className="col-form-label" htmlFor="programId" onChange={props.findPrograms}>Program</label>
                        <select>
                            <option key="none" value="" />
                            {props.programs.map(program => {
                                return <option key={program.programId} value={program.programId}>{program.name}</option>
                            })}
                        </select>
                    </div>

                    <button className="btn btn-primary" id="programLookupButton" onClick={props.startConversion}>Start a conversion</button>
                </div>
            </div>
        </div>
    );
}

ProgramSearch.propTypes = {
    programStp: PropTypes.string.isRequired,
    programs: PropTypes.array.isRequired,
    updateStp: PropTypes.func.isRequired,
    startConversion: PropTypes.func.isRequired
}


export default ProgramSearch;