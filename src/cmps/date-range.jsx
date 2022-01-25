import React from 'react'
import { connect } from 'react-redux'

import { DateRange as DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file  
import 'react-date-range/dist/theme/default.css' // theme css file

class _DateRange extends React.Component {
    state = {
        trip: {
            stayTime: {
                startDate: '',
                endDate: '',
            }
        }
    }

    handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection
        this.setState({ startDate, endDate }, () => {
            this.props.setDates(startDate, endDate)
        })
        console.log('start', ranges.selection.startDate)
        console.log('end', ranges.selection.endDate)
    }

    render() {
        const selectionRange = { startDate: new Date(), endDate: new Date(), key: "selection" }
        return (
            <div className='date-range-container'>
                <DateRangePicker
                    onChange={this.handleSelect}
                    className="date-range-calender"
                    ranges={[selectionRange]}
                    appearance="default"
                    placeholder="Default"
                    months={2}
                    direction='horizontal'
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
const mapDispatchToProps = {}

export const DateRange = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DateRange);  