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
        const token = sessionStorage.getItem("AUTH_TOKEN_KEY");
        console.log(typeof token);
        if (token !== 'undefined' && token !== null) {
            Promise.resolve(getUserInfo())
                .then(data => {
                    console.log('ded');
                    let {userInfo} = data
                    this.setState({ isAuthenticated: true, currentUser: userInfo });
                })
                .catch(err => console.log(err.message))
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
                    .catch(err => console.log(err.message))
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

