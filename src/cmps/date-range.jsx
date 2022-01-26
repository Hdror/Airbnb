// import React from 'react'
// import { connect } from 'react-redux'

// import { DateRange as DateRangePicker } from 'react-date-range'
// import 'react-date-range/dist/styles.css' // main css file  
// import 'react-date-range/dist/theme/default.css' // theme css file

// class _DateRange extends React.Component {
//     state = {
//         trip: {
//             stayTime: {
//                 startDate: '',
//                 endDate: '',
//             },
//             guests: {
//                 adults: 1,
//                 children: 0
//             },
//             stay: {
//                 address: ''
//             },
//         },
//     }



//     render() {
//         const selectionRange = { startDate: new Date(), endDate: new Date(), key: "selection" }
//         console.log(selectionRange);
//         return (
//             <div className='date-range-container'>
//                 <DateRangePicker
//                     className="date-range-calender"
//                     appearance="default"
//                     placeholder="Default"
//                     ranges={[selectionRange]}
//                     months={2}
//                     direction='horizontal'

//                     date={new Date()}
//                     onChange={this.handleSelect}
//                     moveRangeOnFirstSelection={true}
//                     hasCustomRendering={false}
//                 />
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//     }
// }
// const mapDispatchToProps = {}

// export const DateRange = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(_DateRange);


