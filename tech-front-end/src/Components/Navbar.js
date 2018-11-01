import React from "react";
// import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import "../App.css";


const Navbar = props => {
  return (
    <Menu 
    className='menu-bar'
    inverted
    color='blue'>
      <Link to="/">
        <Menu.Item
          name="editorials"
        // active
        >
          Dashboard
        </Menu.Item>{" "}
      </Link>
      <Link to="/employees">
        <Menu.Item
          name="editorials"
        // active
        >
          Employees
        </Menu.Item>
      </Link>

      <Link to="/projects">
        <Menu.Item
          name="editorials"
        // active
        >
          Projects
        </Menu.Item>
      </Link>
      {localStorage.isAuthorized === 'true' ? 
          <Link to='/logout'><Menu.Item
            name='editorials'
          // active
          >Logout</Menu.Item> </Link>
          : <Link to='/login'><Menu.Item
            name='editorials'
          // active
          >Login</Menu.Item> </Link> 
      }
      <Menu.Item
        className='menu-icon'
        position='right'
        name='editorials'>
              <Icon circular color='white' name='user' /> {localStorage.currentUser}
      </Menu.Item>

    </Menu>
  );
};

// Navbar.propTypes = {

// };

export default Navbar;
