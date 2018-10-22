import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Boards from '../Boards/Boards'

import './Layout.css'

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  }
    }
    
    render() {
        return (
            <div className="app">
                <Header title={ this.props.config.title } />
                <Main>
                    <Boards data={ this.props.data } teams={ this.props.teams } config={ this.props.config } />
                    <div id="pop-up" className="hidden"></div>
                </Main>
                <Footer safetyMessage={ this.props.safetyMessage } />
            </div>
        )
    }
}

Layout.propTypes = {
    config: PropTypes.object,
    data: PropTypes.object,
    teams: PropTypes.object,
    safetyMessage: PropTypes.string
}

export default Layout