import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import "../App.css";

class Navbar extends Component {
  state = {
    activeItem: 'dashboard'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    return (
      <Menu
        className='menu-bar'
        inverted
        size='huge'
        color='blue' >

        <Link to="/">
          <Menu.Item
            name="dashboard"
            active={this.state.activeItem === 'dashboard'}
            onClick={this.handleItemClick}
          >
            Dashboard
        </Menu.Item>
        </Link>

        <Link to="/employees">
          <Menu.Item
            name="employees"
            active={this.state.activeItem === 'employees'}
            onClick={this.handleItemClick}
          >
            Employees
        </Menu.Item>
        </Link>

        <Link to="/projects">
          <Menu.Item
            name="projects"
            active={this.state.activeItem === 'projects'}
            onClick={this.handleItemClick}
          >
            Projects
        </Menu.Item>
        </Link>

        {localStorage.isAuthorized === 'true' ?
          <Link to='/logout'>
            <Menu.Item
              name="logout"
              position='right'
              active={this.state.activeItem === 'logout'}
              onClick={this.handleItemClick}
            >Logout</Menu.Item> </Link>
          : <Link to='/login'>
          <Menu.Item 
            name="login"
            position='right'
            active={this.state.activeItem === 'login'}
            onClick={this.handleItemClick}>Login
          </Menu.Item> 
          </Link>

        }

        <Menu.Item
          className='menu-icon'
          position='right'
          name='user'>
          <Icon size='small' color='white' name='user' /> {localStorage.currentUser}
        </Menu.Item>

      </Menu >
    )
  }
};


export default Navbar;
