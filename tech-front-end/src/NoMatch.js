import React from 'react';
import { Link } from 'react-router-dom';
const NoMatch = ({ location }) => {
    return (
      <div>
        <h3>
           <div>{location.pathname} does not exist!</div>
           <br/>
           <Link to='/'>Return To Dashboard</Link>
        </h3>
      </div>
    );
  }
 
export default NoMatch;