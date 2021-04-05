import React, { createContext, Component } from 'react';
import { login, logout, getUserInfo } from '../service/authService'

export const UserContext = createContext();

export default class UserContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false,
            isAdmin: false,
            currentUser: {}
        }

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("AUTH_TOKEN_KEY")) {
            Promise.resolve(getUserInfo())
                .then(data => {
                    let {userInfo} = data
                    this.setState({ isAuthenticated: true, currentUser: userInfo });
                })
        }
    }

    handleLogoutClick() {
        logout();
        this.setState({ isAuthenticated: false, currentUser: {} })
    }

    handleLoginClick(data) {
        login(data).then(token => {
            if (token.id_token) {
                Promise.resolve(getUserInfo())
                    .then(data => {
                        let {userInfo} = data
                        this.setState({ isAuthenticated: true, currentUser: userInfo });
                    })
            }
        });

    }

    render() {
        return (
            <UserContext.Provider value={{ ...this.state, logout: this.handleLogoutClick, login: this.handleLoginClick }} >
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

