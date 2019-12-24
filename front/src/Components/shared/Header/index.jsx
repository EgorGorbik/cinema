import React, {useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import './styles/_index.scss';
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";

function Header(props) {
    const [mustRedirect, changeRedirectFlag] = useState(false);

    function logout() {
        props.logoutAdmin();
    }

    useEffect(() => {
        if(props.admin.logout) {
            changeRedirectFlag(true)
        }
    }, [props.admin])

    if(mustRedirect) {
        return(<Redirect to='/admin/login'/>)
    }

    return(
        <>
            <Navbar className='navbar'>
                <Navbar.Brand >Admin</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link>Статистика</Nav.Link>
                    <Nav.Link>Деньги</Nav.Link>
                </Nav>
                <Form inline>
                    <Button onClick={() => {logout()}} className='btn_logout'>Log Out</Button>
                </Form>
            </Navbar>
            <br />
</>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader
});

const mapDispatchToProps = (dispatch) =>  ({
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));