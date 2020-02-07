import React from 'react';
import './styles/_index.scss';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function Header (props) {
    console.log(props.user)

    const handleAuthManipulation = () => {
        props.user.data ? logout() : login()

    }

    const logout = () => {
        console.log('logout')
        props.logoutUser();
        //window.location.reload();

    }

    const login = () => {
        props.history.push('/login')
    }

    return(
        <>
            <Navbar className='navbar'>
                <Navbar.Brand onClick={() => props.history.push("/")}>Main</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => props.history.push("/admin/films")}>Фильмы</Nav.Link>
                    <Nav.Link onClick={() => props.history.push("/admin/sessions")}>Сеансы</Nav.Link>
                </Nav>
                <Form inline>
                    <Button onClick={() => handleAuthManipulation()} className='btn_auth'>{
                        props.user.data ? 'Log Out' : 'Log In'
                    }</Button>
                </Form>
            </Navbar>
            <br />
        </>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    session: state.session,
    films: state.films,
    loader: state.loader,
    user: state.user
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
    getSession: (id) => {dispatch({type: 'GET_SESSION', id: id})},
    deleteSession: (id) => {dispatch({type: 'DEL_SESSION', id: id})},
    logoutUser: () => {dispatch({type: 'LOGOUT_USER'})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));