import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({component: Component, authed, ...rest}) => {
    console.log("Private Route:", authed);
    console.log(typeof authed);
    return(
        <Route
        {...rest}
        render={(props) => authed == true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
}

 
export default privateRoute;