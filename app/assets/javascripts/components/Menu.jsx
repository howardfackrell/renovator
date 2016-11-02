'use strict'

import React from 'react'
import {Link} from 'react-router'

const Menu = () => {
  return (
    <nav className="navbar navbar-default">
      <ul className="nav navbar-nav">
        <li><Link to="/">Start a new Conversion</Link></li>
      </ul>
    </nav>
  )
}

export default Menu