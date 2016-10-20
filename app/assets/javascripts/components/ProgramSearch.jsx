'use strict'

import React, { PropTypes } from 'react'
import Menu from './Menu'

const ProgramSearch = (props) => {
    return (
        <div className="container-fluid">
            <Menu />
            <div className="programLookup row">
                <p>current stp is : {props.programStp}</p>
                <p>current programs are : </p>
                <form >
                    <div className="form-group" >
                        <label className="col-form-label" htmlFor="stp">STP:</label>
                        <input type="textbox" onBlur={props.updateStp}/>
                    </div>
                    <div className="form-group" >
                        <label className="col-form-label" htmlFor="programId" onChange={props.findPrograms}>Program</label>
                        <select type="select">

                        </select>
                    </div>

                    <button className="btn btn-primary" id="programLookupButton" onClick={props.findPrograms}>Start a conversion</button>
                </form>
            </div>
        </div>
    );
}

ProgramSearch.propTypes = {
    programStp: PropTypes.string.isRequired,
    updateStp: PropTypes.func.isRequired,
    findPrograms: PropTypes.func.isRequired,
    startConversion: PropTypes.func.isRequired
}


export default ProgramSearch;