import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {

    const context = useContext(UserContext);

    return (
        <Route {...rest} render={props => (
            context.isAuthenticated ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;