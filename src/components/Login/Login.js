import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Login.css'
import * as config from '../../config.json'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { userId: '', domain: '', password: '' }
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    inputChangeHandler(event) {
        this.setState({ [ event.target.name ]: event.target.value })
    }

    submitHandler(event) {
        event.preventDefault()
        fetch(config.api.adauth.uri, {
            method: config.api.adauth.method,
            headers: {
                user: this.state.userId,
                domain: this.state.domain,
                password: this.state.password
            },
            ca: this.props.cacert
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error))

        // props.loginHandler(token)
    }

    render() {
        const isReady = this.state.userId.length > 0 && this.state.domain.length > 0 && this.state.password.length > 0
        return (
            <form className="app-login-form" onSubmit={ this.submitHandler }>
                <p className="app-login-form-caption">Use your domain credentials to log in.</p>
                <label className="app-login-form-input">
                    <span id="domain">&#xf1ad;</span>
                    <input name="domain" type="text" value={ this.state.domain } onChange={ this.inputChangeHandler } placeholder="domain (ex. euro)" required autoComplete="off" />
                </label>
                <label className="app-login-form-input">
                    <span id="userId">&#xe804;</span>
                    <input name="userId" type="text" value={ this.state.userId } onChange={ this.inputChangeHandler } placeholder="user id" required autoComplete="off" />
                </label>
                <label className="app-login-form-input">
                    <span id="password">&#xe830;</span>
                    <input name="password" type="password" value={ this.state.password } onChange={ this.inputChangeHandler } placeholder="password" required autoComplete="off" />
                </label>
                <button name="submit" className="app-login-form-submit" disabled={ !isReady }><span>Log in</span></button>
                <p className="app-login-form-status">{this.state.status}</p>
            </form>
        )
    }

}

Login.propTypes = {

}

export default Login