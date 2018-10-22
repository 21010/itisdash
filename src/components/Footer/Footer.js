import React from 'react'
import './Footer.css'

function SafetyMessage(props) {
    return (
        <dl className="safety-message">
            <dt className="safety-message-label">Daily Health and Safety Message: </dt>
            <dd className="safety-message-content">{props.message}</dd>
        </dl>
    )
}

function Footer(props) {
    return (
        <footer id="app-footer">
            <SafetyMessage message={ props.safetyMessage } />    
        </footer>
    )
}

export default Footer