import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'


import { HomePage } from './pages/home-page.jsx'
// import { StayEdit } from './pages/stay-edit.jsx'
import { StayApp } from './pages/stay-app.jsx'
import { HostPage } from './pages/host.jsx'
import { toggleModal } from './store/page.action.js'

import { StayDetails } from './pages/stay-details.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { LoginSignup } from './pages/login-signup.jsx'
import { Orders } from './pages/order.jsx'
import { StayEdit } from './cmps/stay-edit.jsx'
import { Wishlist } from './pages/wishlist.jsx'


export class _RootCmp extends React.Component {

  render() {
    return (
      <>
        <AppHeader />

        <Switch>
          {/* <Route component={StayEdit} path="/stay-edit/:stayId" /> */}
          <Route component={StayDetails} path="/stay/:stayId" />
          <Route component={StayEdit} path="/stay-edit/" />
          <Route component={StayApp} path="/stay" />
          <Route component={LoginSignup} path="/login" />
          <Route component={Orders} path="/orders" />
          <Route component={Wishlist} path="/wish-list" />
          <Route component={HostPage} exact path="/host" />
          <Route component={HomePage} exact path="/" />
        </Switch>
        <AppFooter />
        <div onClick={() => { this.props.toggleModal() }} className={this.props.isModalOpen ? "screen open" : "screen"}></div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    isModalOpen: state.pageModule.isModalOpen
  }
}

const mapDispatchToProps = {
  toggleModal
}

export const RootCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RootCmp)