import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Loader from "../../shared/Loader";
import Header from "../../User/Header";
import '../styles/_index.scss';
import Poster from "../Poster";

function Main(props) {
    useEffect(() => {
        props.getFilms()
    }, [])

    if(props.loader || !props.films) {
        return <Loader/>
    }

    return(
        <div className='main'>
            <Header/>
            <div className='main_user_header'>Фильмы в прокате</div>
            <div className='posters'>
                {
                    props.films.map(e => <Poster info={e}/>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    films: state.films
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main));