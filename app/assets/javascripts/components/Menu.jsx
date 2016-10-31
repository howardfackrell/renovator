'use strict'

import React from 'react';
import { Link } from 'react-router';

const Menu = (props) => {
    return (
    <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
            <li><Link to="Start" >Start a new Conversion</Link></li>
            <li><Link to="Continue" >Continue an existing Conversion</Link></li>
        </ul>
    </nav>
    )
}

export default Menu;