import React from 'react'
import { StayList } from '../cmps/stay-list.jsx'
import { stayService } from '../services/stay.service.js'
import { changePage } from '../store/page.action.js'
import { connect } from 'react-redux'

class _StayApp extends React.Component {
  state = {}

  componentDidMount() {
    stayService.query()
    this.props.changePage('stay-app')
  }

  render() {
    return (
      <main className="main-container page">

        <StayList />

      </main>

    )
  }
}


const mapDispatchToProps = {
  changePage
}

export const StayApp = connect(
  null,
  mapDispatchToProps
)(_StayApp)
