import React, { Component } from 'react';
import {Navbar,Nav,Form} from 'react-bootstrap';
import {Link,NavLink} from 'react-router-dom';
import logo from './carouselPics/logo.png';

export default class Navigation extends Component {
    render() {
        const style ={
            color:'navy',
            fontFamily:'Trebuchet MS", Helvetica, sans-serif',
            fontSize:'15px',
            marginLeft:'20px'
        }
        return (
            <Navbar className="border border-primary" style ={{background:'#FFFFFF'}} fixed="top">
            <Link to={"/"}className="navbar-brand">
            <Navbar.Brand><img className="logo"  src={logo} alt="logo" style={{minWidth: '8rem', height:'3rem'}}></img></Navbar.Brand>
            </Link>
            <Nav className="mr-auto">
                <NavLink style={style} className="nav-link " to={""}>Home</NavLink>
                <NavLink style={style} className="nav-link" to={"services"}>Dental Services</NavLink>
                <NavLink style={style} className="nav-link" to={"ourteam"}> Ourteam</NavLink>
            </Nav>
            <Form inline>
            <NavLink style={style} className="nav-link " to={"signin"}><i class="fas fa-user-cog"></i>  Setting</NavLink>
          </Form>
          </Navbar>
        )
    }
}
