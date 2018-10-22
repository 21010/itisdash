import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'

function Header(props) {
    return (
        <header id="app-header">
            <h1 id="app-title"><a href="/">{props.title}</a></h1>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header