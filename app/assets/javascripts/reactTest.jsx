// tutorial1.js
// import React from 'react';

var React = require('react');





var ProgramLookupPanel = React.createClass({
    getInitialState : function() {
      return {stp : "", programs : []}
    },
    handleStpChange : function(e) {
        var currentStp = e.target.value;
        $.ajax({
            url: this.props.url + "/clients/" + currentStp + "/programs",
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
    },
    render: function() {
        return (
            <div>
            <Menu />
            <div className="programLookup">
                <h3>Look up an existing program to start a new conversion</h3>
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

                    <button  id="programLookupButton">Find</button>
                </form>
            </div>
            </div>
        );
    }
});



ReactDOM.render(
    <ProgramLookupPanel url="http://localhost:9000"/>,
    document.getElementById('content')
);