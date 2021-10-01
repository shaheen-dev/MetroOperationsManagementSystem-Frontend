import React from 'react'
import { Component } from 'react';
import { Redirect } from 'react-router';



export default class LogOut extends Component {
    state = {
        redirect: false,
    };

    componentDidMount() {
        localStorage.setItem("userToken", '');
        localStorage.clear();
        this.setState({ redirect: true });
    }

    render() {
        return this.state.redirect ?
            <Redirect to={'/login'} /> :
            null;
    }
}
