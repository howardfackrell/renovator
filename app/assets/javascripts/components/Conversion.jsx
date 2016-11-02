'use strict'

import React from 'react'
import Menu from './Menu'

const CopyProgramStep = () => {
  return (
    <input type="text" placeholder="Program Name"/>
  )
}

const CopyAssetsStep = () => {
  return (
    <div className="row">

      <div className="col-sm-3">
        <h6>Load Photo for</h6>
        <div className="radio">
          <label>
            <input type="radio" name="photo" value="Client"/>
            Client
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="photo" value="Program"/>
            Program only
          </label>
        </div>
      </div>

      <div className="col-sm-3">
        <h6>Load Logo for</h6>
        <div className="radio">
          <label>
            <input type="radio" name="logo" value="Client"/>
            Client
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="logo" value="Program"/>
            Program only
          </label>
        </div>
      </div>

      <div className="col-sm-3">
        <h6>Load Photo for</h6>
        <div className="radio">
          <label>
            <input type="radio" name="sig" value="Client"/>
            Client
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="sig" value="Program"/>
            Program only
          </label>
        </div>
      </div>
    </div>
  )
}

const StepWrapper = (props) => {
  let background
  switch (props.status) {
    case 'failed':
      background = 'panel-danger'
      break
    case 'success':
      background = 'panel-success'
      break
    default :
      background = 'panel-default'
      break
  }
  return (
    <div className={'panel ' + background }>
      <div className="panel-heading">
        <h4>{props.name}</h4>
        {(props.error) ?
          <p>{props.error}</p> :
          <p></p>
        }
      </div>
      <div className="panel-body">
        {
          props.children
        }
        <div className="row">
          <div className="col-sm-8">
            <button className="btn btn-primary">Make it so</button>
            <button className="btn btn-sm">I did it myself</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Conversion = ({params: {conversionId}}) => {
  return (
    <div className="container-fluid">
      <Menu />
      <div className="col-sm-offset-1 col-sm-10">
        <div className="row">
          <h2 className="col-sm-12">Conversion {conversionId}</h2>
        </div>
        <StepWrapper name="Some Step" status="failed" error="Something bad happened">
          <div>This is the inner Content</div>
        </StepWrapper>
        <StepWrapper name="Copy Program" status="success">
          <CopyProgramStep/>
        </StepWrapper>
        <StepWrapper name="Copy Assets to DCTM">
          <CopyAssetsStep/>
        </StepWrapper>
      </div>
    </div>
  )
}

export default Conversion