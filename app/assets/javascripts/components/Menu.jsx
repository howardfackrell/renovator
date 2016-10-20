'use strict'

import React from 'react';
import { Link } from 'react-router';

const Menu = (props) => {
    return (<div>
        <Link to="Start" >Start a new Conversion</Link>
        {" | "}
        <Link to="Continue" >Continue an existing Conversion</Link>
    </div>)
}

export default Menu;