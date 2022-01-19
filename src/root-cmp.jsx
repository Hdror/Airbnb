import React from 'react'
import { Switch, Route } from 'react-router'

import { Home } from './pages/home.jsx'
import { ToyEdit } from './pages/toy-edit.jsx'
import { ToyApp } from './pages/toy-app.jsx'
import { AboutPage } from './pages/toy-about.jsx'


import { AppHeader } from './cmps/app-header.jsx'
// import {AppFooter} from './cmps/app-footer.jsx'

export class RootCmp extends React.Component {

    render() {
        return (
            <div>
                <AppHeader />
                <main className="main-layout">
                    <Switch>
                        <Route component={ToyEdit} path="/toy-edit/:toyId" />
                        <Route component={StayEdit} path="/toy-edit/" />
                        <Route component={AboutPage} path="/about/" />
                        <Route component={StayApp} path="/stay" />
                        <Route component={Home} exact path="/" />
                    </Switch>
                </main>
                {/* <AppFooter /> */}
            </div>
        )
    }
}
