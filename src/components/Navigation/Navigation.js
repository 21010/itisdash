import React from 'react'
import './Navigation.css'

class Navigation extends React.Component {
    render() {
        return (
            <nav id="app-navigation" className={ this.props.isActive ? 'active' : 'hidden' }>
                <ul>
                    <NavigationLink anchor="Log in" />
                </ul>
            </nav>
        )
    }
}

function NavigationLink(props) {
    return (
        <li className="app-navigation-link">
            <button>{props.anchor}</button>
        </li>
    )
}

export default Navigation