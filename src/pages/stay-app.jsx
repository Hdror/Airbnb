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
    <main className="main-container page">

        <StayList />
     
    </main>

    )
  }
}
