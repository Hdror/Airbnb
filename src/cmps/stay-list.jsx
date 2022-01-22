import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from './stay-preview.jsx'
import { loadStays } from '../store/stay.action.js'
class _StayList extends React.Component {
  componentDidMount() {
    this.props.loadStays()
  }

  render() {
    const { stays } = this.props
    if (!stays.length) return <h1>There are no stays to show</h1>
    return (
      <section >
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