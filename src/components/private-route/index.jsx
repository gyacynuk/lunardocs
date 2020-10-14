  
import React from "react";
import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { isUserPending, isUserSignedIn } from "../../store/selectors";
import PageLoadingAnimation from "../page-loading-animation";

const PrivateRoute = ({ component, children, ...props }) => {
    const signInPending = useSelector(isUserPending);
    const userSignedIn = useSelector(isUserSignedIn);

    // Extract the computed matched from the Route, and pass them as props to all children, or single child
    const routeComponent = !!children
        ? React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, props.computedMatch.params || {});
            }
            return child;
        })
        : component(props.computedMatch.params || {});

    return (
        <Route {...props}>
            {
                signInPending
                    ? <PageLoadingAnimation/>
                    : userSignedIn
                        ? routeComponent
                        : <Redirect to={"/login"} />
            }
        </Route>
    )
};

PrivateRoute.propTypes = {};

export default PrivateRoute;