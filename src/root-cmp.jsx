import React from 'react'
import { Switch, Route } from 'react-router'

import { HomePage } from './pages/home-page.jsx'
// import { StayEdit } from './pages/stay-edit.jsx'
import { StayApp } from './pages/stay-app.jsx'

import { StayDetails } from './pages/stay-details.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'

export class RootCmp extends React.Component {

  render() {
    return (
      <div>
        <AppHeader />
        <main >
          <Switch>
            {/* <Route component={StayEdit} path="/stay-edit/:stayId" /> */}
            <Route component={StayDetails} path="/stay/:stayId" />
            {/* <Route component={StayEdit} path="/stay-edit/" /> */}
            <Route component={StayApp} path="/stay" />
            <Route component={HomePage} exact path="/" />
          </Switch>
        </main>
        <AppFooter />
      </div>
    )
  }
}
