import React, {createContext, Component} from 'react';
import {login} from '../service/authService'

export const UserContext = createContext();

export default class UserContextProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: false,
            username: 'gosho',
            currentUser : {}
        }
    }

    componentDidMount(){
       if(!this.state.isAuthenticated){
           fetch('http://localhost:8080/api/user/info')
           .then(res => res.json())
           .then(info => {
               this.setState({currentUser: info.userInfo})
           })
           .catch(err => {
               console.log(err.message);
           })
       }
    }

    function 

    render(){
        return(
            <UserContext.Provider value={{...this.state}} >
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

