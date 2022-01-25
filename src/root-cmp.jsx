import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { HomePage } from './pages/home-page.jsx'
// import { StayEdit } from './pages/stay-edit.jsx'
import { StayApp } from './pages/stay-app.jsx'

import { StayDetails } from './pages/stay-details.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { LoginSignup } from './cmps/login-signup.jsx'

// Screen component transparant 
// fix position - and onclick close modal (store - isModalOpen - page)
export class RootCmp extends React.Component {

  render() {
    return (
      <>
        <AppHeader />
        <Switch>
          {/* <Route component={StayEdit} path="/stay-edit/:stayId" /> */}
          <Route component={StayDetails} path="/stay/:stayId" />
          {/* <Route component={StayEdit} path="/stay-edit/" /> */}
          <Route component={StayApp} path="/stay" />
          <Route component={LoginSignup} path="/login" />
          <Route component={HomePage} exact path="/" />
        </Switch>
        <AppFooter />
      </>
    )
  }
}
