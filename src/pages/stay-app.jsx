import React from 'react'
import { StayList } from '../cmps/stay-list.jsx'
// import { stayService } from '../services/stay.service.js'
import { changePage } from '../store/page.action.js'
import { connect } from 'react-redux'

class _StayApp extends React.Component {
  state = {}

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.changePage('stay-app')
  }

  render() {
    return (
      <main className="main-container page stay-app">
        <StayList />
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    filterBy: state.stayModule.filterBy
  }
}

const mapDispatchToProps = {
  changePage
}

export const StayApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StayApp)
