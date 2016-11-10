'use strict'

import React, {PropTypes} from 'react'
import Menu from './Menu'

const StepWrapper = (props) => {
  const { step, stepCompleted, executeStep, children} = props
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
      </div>
      <div className="panel-footer">
        <button className="btn btn-primary" onClick={() => {executeStep(step.conversionId)}}>Make it so</button>
        <button className="btn btn-sm" onClick={() => {stepCompleted(step.conversionId, step.id)}}>I did it myself</button>
      </div>
    </div>
  )
}


const CopyProgramStep = (props) => {
  return (
    <StepWrapper step={ props.step }
                 stepCompleted={props.stepCompleted}
                 executeStep={props.executeStep}>
      <input type="text" placeholder="Program Name" onChange={(event) => { props.updateProgramName(event.target.value)} }/>
    </StepWrapper>
  )
}

CopyProgramStep.propTypes = {
  step: PropTypes.object.isRequired,
  stepCompleted: PropTypes.func.isRequired,
  executeStep: PropTypes.func.isRequired,
  updateProgramName: PropTypes.func.isRequired
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
        <CopyProgramStep step={stepLookup['Copy Program']}
                     stepCompleted={props.stepCompleted}
                     executeStep={props.startProgramCopy}
                         updateProgramName={props.updateProgramName}>
          <div>This is the inner Content</div>
        </CopyProgramStep>
        {/*<StepWrapper step={{status:'FAILED'}} stepCompleted={props.stepCompleted} >*/}
          {/*<CopyProgramStep/>*/}
        {/*</StepWrapper>*/}
        {/*<StepWrapper step={{status:'STARTED'}} stepCompleted={props.stepCompleted}>*/}
          {/*<CopyAssetsStep/>*/}
        {/*</StepWrapper>*/}
      </div>
    </div>
  )
}

Conversion.propTypes = {
  conversion: PropTypes.object.isRequired,
  stepCompleted: PropTypes.func.isRequired,
  startProgramCopy: PropTypes.func.isRequired,
  updateProgramName: PropTypes.func.isRequired
}

export default Conversion