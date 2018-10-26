import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Login from './Login';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'


//   onChange = (e, key) => {
//     this.setState({
//         [key]: this[key].value
//     })

// }

const Navbar = props => {
    return (
    <Menu>
    
            
            <Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Assignments</Menu.Item>
            <Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Employees</Menu.Item>
            <Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Projects</Menu.Item>
            <Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Login</Menu.Item>
            <Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Signup</Menu.Item>


        
            
            <Link to='/'>Dashboard </Link>
            <Link to='/assignments'>Assignments</Link>
            <Link to='/employees'>Employees  </Link>
            <Link to='/projects'>Projects  </Link>
            <Link to='/login'>Login </Link>
            <Link to='/signup'>Signup</Link>
            
        
    </Menu>
      );
}
 
// Navbar.propTypes = {

// };

export default Navbar;