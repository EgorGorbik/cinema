import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Loader from "../Loader";

function Hall3 (props) {

    if(props.loader || props.session === null) {
        return (
            <Loader/>
        )
    }

    if(localStorage.getItem('user_access_token') && !props.user.data) {
        return <Loader/>
    }

    let rows = [];
    for(let i = 1; i <= 5; i++) {
        rows.push(<div className='row'>{i} ряд</div>)
    }

    console.log(props.session)
    return (
        <div className='hall'>
            <div className='places'>
                {
                    props.session.places.map(e => {
                        if(e.isFree || localStorage.getItem('user_access_token') && props.user.data.chooseTicketInfo.idPlaces.includes(e.id)) {
                            console.log(e)
                            return <div id={e.id} key={e.id} onClick={() => props.isUser && props.choosePlace(e)} className='place place_hall3 free_place' isFree={e.isFree}>{e.place}</div>
                        } else {
                            console.log(e)
                            return <div id={e.id} key={e.id} className='place place_hall3 taken_place' isFree={e.isFree}>{e.place}</div>
                        }
                    })
                }
            </div>
            <div className='rows'>
                {rows}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    session: state.session,
    loader: state.loader,
    user: state.user
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    getSessions: (date) => {dispatch({type: 'GET_SESSIONS', date: date})},
    getSession: (id) => {dispatch({type: 'GET_SESSION', id: id})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Hall3));