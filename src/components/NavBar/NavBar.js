import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Nav, Navbar, NavItem, NavLink} from 'reactstrap';

class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to='/'>HOME</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/Dishes'>DISHES</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/Orders'>ORDERS</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;