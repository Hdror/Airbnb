import React from 'react'
import { StayList } from '../cmps/stay-list.jsx'
import { stayService } from '../services/stay.service.js'

export class StayApp extends React.Component {
  state = {}

  componentDidMount() {
    stayService.query()
  }
  render() {
    return (
      <React.Fragment>
        <h1>Stay App</h1>
        <StayList />
      </React.Fragment>

    )
  }
}
