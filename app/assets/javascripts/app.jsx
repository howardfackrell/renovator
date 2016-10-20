'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './components/Menu';
import configureStore from './store/index'

import ProgramSearch from './containers/ProgramSearchPage';
import ConversionSearch from './containers/ConversionSearchPage';




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

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Menu}/>
            <Route path="/start" component={ProgramSearch}/>
            <Route path="/continue" component={ConversionSearch}/>

        </Router>
    </Provider>
    ,
    document.getElementById('content')
);
