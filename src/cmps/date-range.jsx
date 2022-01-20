import React from 'react'
import { connect } from 'react-redux'

import { DateRange as DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file  
import 'react-date-range/dist/theme/default.css' // theme css file

class _DateRange extends React.Component {
    state = {
        startDate: new Date(),
        endDate: new Date()
    }

    handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection
        this.setState({ startDate, endDate }, () => {
            this.props.setDates(startDate, endDate)
        });
    };

    render() {
        const { startDate, endDate } = this.state
        const stayRange = {
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }
        return (
            <div className='date-range-container'>
                <DateRangePicker
                    className='date-range'
                    ranges={[stayRange]}
                    onChange={this.handleDateSelect}
                    months={2}
                    direction='horizontal'
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                />
                <button type='button'>Close</button>
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