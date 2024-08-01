import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [cookies] = useCookies(['accessToken']);

    console.log("ProtectedRoute   : ",cookies)

    return (
        cookies.accessToken ? (
            <Component />
        ) : (
            <Navigate to="/" />
        )
    );
};

export default ProtectedRoute;
