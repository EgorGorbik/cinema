import React from 'react';
import './styles/_index.scss';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";

function Header (props) {
    return(
        <>
            <Navbar className='navbar'>
                <Navbar.Brand onClick={() => props.history.push("/")}>Main</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => props.history.push("/admin/films")}>Фильмы</Nav.Link>
                    <Nav.Link onClick={() => props.history.push("/admin/sessions")}>Сеансы</Nav.Link>
                </Nav>
                <Form inline>
                    <Button className='btn_auth'>Log In</Button>
                </Form>
            </Navbar>
            <br />
        </>
    )
}

export default withRouter(Header);