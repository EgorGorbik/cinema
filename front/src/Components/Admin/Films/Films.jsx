import React, { useState, useEffect } from 'react';
import Film from "./Film";
import '../styles/_index.scss';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import FilmForm from "./FilmForm";

function Films(props) {

   const [isFormOpen, changeFormFlag] = useState(false);
   const [formInitialValue, changeFormInitialValue] = useState();

    return(
        <div className='film_content'>
            <Button onClick={() => createFilm()}>{isFormOpen? 'Отмена': 'Создать'}</Button>
            {isFormOpen &&
                <FilmForm changeFormFlag={changeFormFlag} initial={formInitialValue}/>
            }
            <div className='films'>
                {props.films.map((el) => <Film key={el._id} info={el} editFilm={editFilm}/>
                )}
            </div>
        </div>
    )

    function createFilm() {
        changeFormFlag(!isFormOpen)
        changeFormInitialValue(false)
    }

    function editFilm(film) {
        changeFormInitialValue(film)
        changeFormFlag(true);
    }
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
)(Films));