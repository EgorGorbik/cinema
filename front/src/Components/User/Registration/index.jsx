import React, {Component, useRef, useState} from 'react';
import './styles/_index.scss';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Alert from "react-bootstrap/Alert";
import Loader from "../../shared/Loader";
import {withRouter} from "react-router";


function Registration(props) {
    let username = useRef();
    const password = useRef();

    const [ errorRegistration, changeErrorFlag ] = useState(false);

    if(props.loader) {
        return <Loader/>
    }

    if(props.user.data) {
       //props.history.goBack();
        props.history.push('/')
    }

    return(
        <div className='main_login_admin'>
            <Form className='admin_login_form'>
                {props.user.error && <Alert className='admin_login_alert' variant="danger" >
                    <p>
                        {props.user.error}
                    </p>
                </Alert>}
                <Form.Group controlId="formBasicEmail">
                    <div className='auth_header'>Registration</div>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" ref={username}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" ref={password}/>
                </Form.Group>
                <Button className='admin_login_button' onClick={() => {handleSubmit()}} variant="primary" >
                    Register
                </Button>
            </Form>
        </div>
    )


    function handleSubmit() {
        let user = {
            username: username.current.value,
            password: password.current.value
        }
        if(!username.current.value.trim() || !password.current.value.trim()) {
            changeErrorFlag(true)
        } else {
            changeErrorFlag(false);
            props.registerUser(user);
        }
    }

}


const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    user: state.user
});

const mapDispatchToProps = (dispatch) =>  ({
    loginUser: (user) => {dispatch({type: "LOGIN_USER", user: user})},
    registerUser: (user) => {dispatch({type: "REGISTER_USER", user: user})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration));