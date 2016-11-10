'use strict'

import React from 'react'
import {shallow} from 'enzyme'
import expect from 'expect'
import ProgramRow from './ProgramRow'

function setup() {
  let props = {
    program: {
      id: 2,
      name: "Test Program",

      conversions: [
        {
          programId: 7,
          name: "conversion went bad"
        },
        {
          programId: 8,
          name: "conversion went better"
        }
      ]
    },
    startConversion: () => {},
    loadConversion: () => {}
  }

  return shallow(<ProgramRow {...props}/>)
}

describe('ProgramRow via enzime', () => {

  it('render a table row', () => {
    const wrapper = setup()
    expect(wrapper.find('a').first().text()).toBe("7 conversion went bad")
  })

})