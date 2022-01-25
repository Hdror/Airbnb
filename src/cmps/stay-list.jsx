import React from 'react'
import { connect } from 'react-redux'

import { StayPreview } from './stay-preview.jsx'
import { FilterBar } from './filter-bar.jsx'

import { loadStays } from '../store/stay.action.js'


class _StayList extends React.Component {

  state = {
    filteredStays: [],
  }

  componentDidMount() {
    this.props.loadStays()
  }

  setFiltersStays = (stays) => {
    this.setState({ filteredStays: stays })
  }

  render() {
    const stays  = this.state.filteredStays.length ? this.state.filteredStays : this.props.stays

    if (!stays.length) return <h1>There are no stays to show</h1>
    return (
      <section >
        <FilterBar setFiltersStays={this.setFiltersStays} stays={this.props.stays} />
        <div className="stay-list">
          {stays.map((stay) => (
            <StayPreview key={stay._id} stay={stay} />
          ))}
        </div>
      </section>
    )
  }
}


function mapStateToProps({ stayModule }) {
  return {
    stays: stayModule.stays
  }
}

const mapDispatchToProps = {
  loadStays
}

export const StayList = connect(mapStateToProps, mapDispatchToProps)(_StayList)