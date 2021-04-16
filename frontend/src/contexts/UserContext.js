import React, { createContext, Component } from 'react';
import { login, logout, getUserInfo, getRoleName } from '../service/authService'

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

        if (token !== 'undefined' && token !== null) {
            Promise.resolve(getUserInfo())
                .then(data => {
                    let { userInfo } = data
                    if (userInfo.roleName === 'ROLE_ADMIN') {
                        this.setState({ isAuthenticated: true, currentUser: userInfo, isAdmin: true });
                    } else {
                        console.log('asdasd');
                        this.setState({ isAuthenticated: true, currentUser: userInfo, isAdmin: false });
                    }
                })
                .catch(err => console.log(err.message))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.currentUser.roleName);
        console.log(this.state.currentUser.roleName);
       if(prevState.currentUser.roleName !== this.state.currentUser.roleName){
           this.setState({isAdmin: this.state.isAdmin})
       }
    }

    handleLogoutClick() {
        this.setState({ isAuthenticated: false, currentUser: {}, isAdmin: false })
        logout();
    }

    handleLoginClick(data) {
       return login(data)
       .then(token => {
            if(token.hasOwnProperty('message')){
                throw Error(token.message)
            }

            if (token.id_token) {
                Promise.resolve(getUserInfo())
                    .then(data => {
                        let { userInfo } = data
                        if (userInfo.roleName === 'ROLE_ADMIN') {
                            this.setState({ isAuthenticated: true, currentUser: userInfo, isAdmin: true });
                        } else {
                            console.log('asdasd');
                            this.setState({ isAuthenticated: true, currentUser: userInfo, isAdmin: false });
                        }
                       
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

