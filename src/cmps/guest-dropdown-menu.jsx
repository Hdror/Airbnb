
import React from 'react'
import Menu, { Item as MenuItem } from 'rc-menu'
import { Link } from 'react-router-dom'
import 'rc-menu/assets/index.css'

export class GuestDropDown extends React.Component {


    render() {

        return (
            <div className="dropdown-user-menu">
                <Menu style={{ margin: 20, width: 300 }}>
                    <Link className="clean-link"><MenuItem key="1">Adults</MenuItem></Link>
                    <Link className="clean-link"><MenuItem key="2">Children</MenuItem></Link>
                    <Link className="clean-link"><MenuItem key="3">Infants</MenuItem></Link>
                    <Link className="clean-link"><MenuItem key="4">Pets</MenuItem></Link>
                    <Link className="clean-link"><MenuItem key="4">Help</MenuItem></Link>
                </Menu>
            </div>
        )
    }
}