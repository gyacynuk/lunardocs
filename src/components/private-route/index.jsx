  
import React from "react";
import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { isAuthPending, isUserSignedIn } from "../../store/selectors";
import PageLoadingAnimation from "../page-loading-animation";

const PrivateRoute = ({ component, children, ...props }) => {
    const signInPending = useSelector(isAuthPending);
    const userSignedIn = useSelector(isUserSignedIn);
    const routeComponent = !!children ? children : component;

    return (
        <Route {...props}>
            {signInPending
                ? <PageLoadingAnimation/>
                : userSignedIn
                    ? routeComponent
                    : <Redirect to={"/login"} />}
        </Route>
    )
};

PrivateRoute.propTypes = {};

export default PrivateRoute;