import React, {Component, useRef} from 'react';
import './styles/_index.scss';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Alert from "react-bootstrap/Alert";


function AdminLogIn(props) {
    let username = useRef();
    const password = useRef();

    if(props.admin.isAdminLogged) {
       return(<Redirect to='/admin/profile'/>)
    }

    return(
        <div className='main_login_admin'>
            <Form className='admin_login_form'>
                {props.admin.loginError && <Alert className='admin_login_alert' variant="danger" >
                    <p>
                        Ошибка авторизации. Попробуйте ещё раз.
                    </p>
                </Alert>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Admin username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" ref={username}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" ref={password}/>
                </Form.Group>
                <Button className='admin_login_button' onClick={() => {handleSubmit()}} variant="primary" >
                    Submit
                </Button>
            </Form>
        </div>
    )



    function handleSubmit() {
        let admin = {
            username: username.current.value,
            password: password.current.value
        }
        props.loginAdmin(admin);
    }

}


const mapStateToProps = (state) => ({
    admin: state.admin
});

const mapDispatchToProps = (dispatch) =>  ({
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogIn);