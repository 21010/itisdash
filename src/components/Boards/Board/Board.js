import React from 'react'
import PropTypes from 'prop-types'

import './Board.css'

function Board(props) {
    return (
        <div className="board">
            { props.title ? <h2>{props.title}</h2> : '' }
            { React.cloneElement(props.children, { 
                data: props.data, 
                config: props.config 
            }) }
        </div>
    )
}

export default Board

Board.propTypes = {
    title: PropTypes.any,
    children: PropTypes.object,
    data: PropTypes.object,
    config: PropTypes.object
}