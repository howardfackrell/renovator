'use strict'

import React, { PropTypes } from 'react'
import Menu from './Menu'

const ConversionSearch = (props) => {
    return(
        <div>
            <Menu />
            <div>
                <p>Current STP is {props.conversionStp} </p>
                <form >
                    <div className="form-group row" >
                        <label className="col-form-label" htmlFor="stp">STP:</label>
                        <input type="textbox" onBlur={props.updateStp} />
                    </div>
                    <div className="form-group row" >
                        <label className="col-form-label" htmlFor="programId" onChange={props.findConversions}>Program</label>
                        <select type="select">

                        </select>
                    </div>

                    <button className="btn btn-primary" id="programLookupButton" onClick={props.selectConversion}>Monitor Conversion</button>
                </form>
            </div>
        </div>
    )
}

ConversionSearch.propTypes = {
    conversionStp: PropTypes.string.isRequired,
    updateStp: PropTypes.func.isRequired,
    findConversions: PropTypes.func.isRequired,
    selectConversion: PropTypes.func.isRequired,
}

export default ConversionSearch;