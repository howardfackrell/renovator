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
  const { step, stepCompleted, children} = props
  let background
  switch (step.status) {
    case 'FAILED':
      background = 'panel-danger'
      break
    case 'COMPLETED':
      background = 'panel-success'
      break
    case 'STARTED':
      background = 'panel-info'
      break
    default :
      background = 'panel-default'
      break
  }
  return (
    <div className={'panel ' + background }>
      <div className="panel-heading">
        <h4>{step.name}</h4>
        <p>id:{step.id} conversionId:{step.conversionId} name:{step.name} status:{step.status}</p>
        {(step.error) ?
          <p>{step.error}</p> :
          <p></p>
        }
      </div>
      <div className="panel-body">
        {
          children
        }
        <div className="row">
          <div className="col-sm-8">
            <button className="btn btn-primary">Make it so</button>
            <button className="btn btn-sm" onClick={() => {stepCompleted(step.conversionId, step.id)}}>I did it myself</button>
          </div>
        </div>
      </div>
    </div>
  )
}


const Conversion = (props) => {

  const stepLookup = {}
  const steps = props.conversion.steps
  for (let i = 0, len = steps.length; i < len; i++) {
    stepLookup[steps[i].name] = steps[i]
  }

  const { id, stp,  originalProgramId}= props.conversion
  return (
    <div className="container-fluid">
      <div className="col-sm-offset-1 col-sm-10">
        <Menu />
        <div className="row">
          <h2 className="col-sm-12">[{id}] Conversion for {stp} / {originalProgramId}</h2>
        </div>
        <StepWrapper step={stepLookup['Copy Program']}
                     stepCompleted={props.stepCompleted}>
          <div>This is the inner Content</div>
        </StepWrapper>
        <StepWrapper step={{status:'FAILED'}} stepCompleted={props.stepCompleted} >
          <CopyProgramStep/>
        </StepWrapper>
        <StepWrapper step={{status:'STARTED'}} stepCompleted={props.stepCompleted}>
          <CopyAssetsStep/>
        </StepWrapper>
      </div>
    </div>
  )
}

export default Conversion