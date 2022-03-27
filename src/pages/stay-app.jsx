import React from 'react'

// STORE
import { connect } from 'react-redux'
import { changePage } from '../store/page.action.js'

// COMPONENTS
import { StayList } from '../cmps/stay-list.jsx'
class _StayApp extends React.Component {

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
