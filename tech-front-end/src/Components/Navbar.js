import React from "react";
// import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import "../App.css";


const Navbar = props => {
  return (
    <Menu className='menu-bar'>

      <Link to="/">
        <Menu.Item
          name="editorials"
        // active
        // onClick
        >
          Dashboard
        </Menu.Item>{" "}
      </Link>

      {/* <Link to="/assignments">
        <Menu.Item
          name="editorials"
        // active
        // onClick
        >
          Assignments
        </Menu.Item>
      </Link> */}

      <Link to="/employees">
        <Menu.Item
          name="editorials"
        // active
        // onClick
        >
          Employees
        </Menu.Item>
      </Link>

      <Link to="/projects">
        <Menu.Item
          name="editorials"
        // active
        // onClick
        >
          Projects
        </Menu.Item>
      </Link>
      {localStorage.isAuthorized === 'true' ? 
          <Link to='/logout'><Menu.Item
            name='editorials'
          // active
          // onClick
          >Logout</Menu.Item> </Link>
          : <Link to='/login'><Menu.Item
            name='editorials'
          // active
          // onClick
          >Login</Menu.Item> </Link> 
        
      }
     

      {/* <Link to='/logout'><Menu.Item
        name='editorials'
      // active
      // onClick
      >Logout</Menu.Item> </Link> */}

      <Menu.Item
        name='       '>
        {}
      </Menu.Item>
      <Menu.Item
        className='menu-icon'
        name='editorials'>
              <Icon circular color='teal' name='users' /> {localStorage.currentUser}
      </Menu.Item>

    </Menu>
  );
};

// Navbar.propTypes = {

// };

export default Navbar;
