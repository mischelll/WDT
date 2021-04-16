import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const context = useContext(UserContext);

    return (
    
        <Route {...rest} render={props => (
            context.isAuthenticated && restricted ?
                <Redirect to="/home" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;