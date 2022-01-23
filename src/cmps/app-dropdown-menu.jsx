
import React from 'react'
import Menu, { Item as MenuItem } from 'rc-menu'
import { Link } from 'react-router-dom'
import 'rc-menu/assets/index.css'

export class MenuDropDown extends React.Component {


    render() {

        return (
            <div className="dropdown-user-menu">
                <Menu style={{ margin: 20, width: 300 }}>
                        <Link className="clean-link"><MenuItem key="1">Log in</MenuItem></Link>
                        <Link className="clean-link"><MenuItem key="2">Sign up</MenuItem></Link>
                        <Link className="clean-link"><MenuItem key="3">Host your home</MenuItem></Link>
                        <Link className="clean-link"><MenuItem key="4">Host an experience</MenuItem></Link>
                        <Link className="clean-link"><MenuItem key="4">Help</MenuItem></Link>
                </Menu>
            </div>
        )
    }
}
