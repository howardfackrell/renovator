import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {

    constructor(pros) {
        super();

    }

    handleStartNewConversion() {
        console.log('handle new conversion')
    }

    handleContinueExistingConversion() {
        console.log('handle existing Conversion')
    }

    render() {
        return (<div>
            <Link to="Start" >Start a new Conversion</Link>
            <Link to="Continue" >Continue an existing Conversion</Link>
        </div>)
    }
}

export default Menu;