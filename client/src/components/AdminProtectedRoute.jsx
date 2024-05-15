import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [cookies] = useCookies(['adminaccessToken']);

    return (
        cookies.adminaccessToken ? (
            <Component />
        ) : (
            <Navigate to="/adminlog" />
        )
    );
};

export default ProtectedRoute;
