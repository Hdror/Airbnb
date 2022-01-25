import React from 'react'
import { Link } from 'react-router-dom'
import 'rc-menu/assets/index.css'

export function MenuDropDown() {
    return (
        <div className="dropdown-user-menu">
            <ul className="dropdown-container">
                <Link className="clean-link clean-list" to="/login"><li>Sign in</li></Link>
                <Link className="clean-link clean-list" to="/login"><li>Sign up</li></Link>
                <Link className="clean-link clean-list" to="/login"><li>Host your home</li></Link>
                <Link className="clean-link clean-list" to="/login"><li>Help</li></Link>
            </ul>
        </div >
    )
}
