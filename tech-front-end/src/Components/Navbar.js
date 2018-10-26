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
    
            
            {/* <Menu.Item
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
            >Signup</Menu.Item> */}


        
            
            <Link to='/'><Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Dashboard</Menu.Item> </Link>
            
            <Link to='/assignments'><Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Assignments</Menu.Item></Link>

            <Link to='/employees'><Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Employees</Menu.Item>  </Link>
            
            <Link to='/projects'><Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Projects</Menu.Item>  </Link>

            <Link to='/login'><Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Login</Menu.Item> </Link>
            
            <Link to='/signup'><Menu.Item
            name='editorials'
            active={<Link to='/'>Dashboard </Link>}
            onClick={console.log("hello")}
            >Signup</Menu.Item></Link>
            
        
    </Menu>
      );
}
 
// Navbar.propTypes = {

// };

export default Navbar;