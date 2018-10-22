import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Login from './Login';

const Navbar = props => {
    return (
        <div>
            <Link to='/'>Dashboard  </Link>
            <Link to='/assignments'>Assignments  </Link>
            <Link to='/employees'>Employees  </Link>
            <Link to='/projects'>Projects  </Link>
            <Login/>
        </div>
      );
}
 
// Navbar.propTypes = {

// };

export default Navbar;