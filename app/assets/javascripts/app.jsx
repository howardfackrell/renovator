
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import Menu from './Menu';
import {TestComp as Thingy, Greeter } from './Greeter';



class ProgramLookupPanel extends React.Component{

    constructor() {
        super();
        this.state =  {stp : "0000368258", programs : []};

        this.handleStpChange = this.handleStpChange.bind(this);
    }

    doSomething(e) {
        e.preventDefault();
        console.log("I'm doing something")
    }

    handleStpChange(e) {
        console.log("running the handler function.....");
        var currentStp = e.target.value;
        $.ajax({
            url: "/clients/" + currentStp + "/programs",
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                console.log("data from webservice is : " );
                data.forEach(function(e) { console.log(e)});
                this.setState({stp : currentStp, programs : data})
                console.log("Everything is O K")
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({stp : currentStp, programs : []});
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        });
    }


    render() {
        return (
            <div>
                <Menu />
                <div className="programLookup">
                    <p>current stp is : {this.state.stp}</p>
                    <p>current programs are : </p>
                    {this.state.programs.map(function(program) {
                        {console.log("trying to print " + program)}
                        return <li key={program.id}>{program.name}</li>
                    })}
                    <form>
                        <label htmlFor="stp">STP:</label>
                        <input type="textbox" onBlur={this.handleStpChange} />
                        <label htmlFor="programId">Program</label>
                        <select type="select">
                            {this.state.programs.map(function(program) {
                                return <option key={program.programId} value={program.programId}>{program.programId + " " + program.name}</option>
                            })}
                        </select>

                        <button  id="programLookupButton" onClick={this.doSomething}>Find</button>
                    </form>
                </div>
            </div>
        );
    }
}

class ContinueConversionPanel extends React.Component {
    render() {
        return <div>
            <Menu />
            <ConversionFinder />
            <ConversionInfo stp="0000123456" originalProgramId="3" programId="12"/>
            <ConversionStep stepId="Copy Program" status="Complete"  />
            <ConversionStep stepId="Push Images to DCTM" status="Failed" error="There was an error" />
            <ConversionStep stepId="Convert Messages" status="Not Started"  />
        </div>
    }
}

class ConversionFinder extends React.Component {

    constructor(props) {
        super();
        this.state = { stp: '', programs : [], program : '' };
        this.handleStpChange = this.handleStpChange.bind(this);
        this.handleProgramChange = this.handleProgramChange.bind(this);
    }

    programIdList(conversions) {
        var programs = [];
        conversions.forEach( function(conversion) {
            programs.push(conversion.programId);
        });
        return programs;
    }

    doSelection(event) {
        console.log("Doing the selection....")

    }

    handleStpChange(e) {
        console.log("running the handler function.....");
        var currentStp = e.target.value;
        $.ajax({
            url: "/clients/" + currentStp + "/conversions",
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                console.log("data from webservice is : " );
                data.forEach(function(e) { console.log(e)});
                this.setState({stp : currentStp, programs : this.programIdList(data)})
                console.log("Everything is O K")
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({stp : currentStp, programs : []});
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        });
    }

    handleProgramChange(e) {
        console.log(e.target.value)
    }

    render() {
        return <div>
            <label htmlFor="stp">STP:</label>
            <input type="textbox" onBlur={this.handleStpChange} />
            <label htmlFor="programId">Program</label>
            <select type="select" onChange={this.handleProgramChange}>
                {this.state.programs.map(function(program) {
                    return <option key={program} value={program}>{program}</option>
                })}

            </select>

            <button  id="programLookupButton" onClick={this.doSelection}>Select</button>
        </div>
    }
}

class ConversionInfo extends React.Component {
    render() {
        return <div>
            <h3>{this.props.stp}/{this.props.originalProgramId} -> {this.props.programId}</h3>
        </div>
    }
}
class ConversionStep extends React.Component {
    render() {

        var error;
        if (this.props.error) {
            error =  <p>Error: {this.props.error}</p>
        }

        return <div>
            <hr />
            <h4>{this.props.stepId}</h4>
            <h5>{this.props.status}</h5>
            {error}
            <button>Do it!</button>
            <button>Mark Complete</button>
        </div>
    }
}


ReactDOM.render(
    <Router history={hashHistory}>

        <Route path="/" component={ProgramLookupPanel} />
        <Route path="/start" component={ProgramLookupPanel} />
        <Route path="/continue" component={ContinueConversionPanel} />
    </Router>
    ,
    document.getElementById('content')
);
