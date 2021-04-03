import React, { createContext, Component } from 'react';
import { login, logout } from '../service/authService'
import { getUserInfo } from '../service/authService';

export const UserContext = createContext();

export default class UserContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false,
            currentUser: {}
        }

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("AUTH_TOKEN_KEY")) {
            this.setState({ currentUser: getUserInfo(), isAuthenticated: true })
            console.log(this.state.currentUser);
        }
    }

    handleLogoutClick() {
        logout();
        this.setState({ isAuthenticated: false, currentUser: {} })
    }

    handleLoginClick(data) {
        login(data).then(token => {
            if(token.id_token){
                this.setState({ isAuthenticated: true, currentUser: getUserInfo() });
                
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

