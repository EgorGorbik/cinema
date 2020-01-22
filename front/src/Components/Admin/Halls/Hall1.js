import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Loader from "../../shared/Loader";

function Hall1(props) {

    console.log(props.session)

    if(props.loader || props.session === null) {
        return (
            <Loader/>
        )
    }

    let rows = [];
    for(let i = 1; i <= 8; i++) {
        rows.push(<div className='row'>{i} ряд</div>)
    }

    return (
        <div className='hall'>
            <div className='places'>
                {
                   props.session.places.map(e => {
                       if(e.isFree) {
                           return <div key={e.id} className='place free_place' isFree={e.isFree}>{e.place}</div>
                       } else {
                           return <div key={e.id} className='place taken_place' isFree={e.isFree}>{e.place}</div>
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
    loader: state.loader
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILM'})},
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
    getSession: (id) => {dispatch({type: 'GET_SESSION', id: id})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Hall1));