import React from 'react';
import '../../../styles/_index.scss';
import Button from "react-bootstrap/Button";

function Film(props) {
    return(
        <div className='film'>
            <img className='poster' src='../../../../../img/interstellar.jpg'/>
            <div className='content'>
                <h2>Интерстеллар</h2>
                <div>Длительность: 2:40</div>
                <p className='description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aliquam aperiam architecto corporis delectus error ex iusto maxime, minima nisi quam quia quibusdam quidem quisquam repudiandae saepe unde! A accusamus animi aspernatur corporis debitis dignissimos dolorem ducimus ea esse explicabo id inventore iusto maiores minima, nihil nulla optio quasi quidem quo recusandae reiciendis repellendus similique vel veniam voluptatem. Accusamus atque autem facere illum incidunt ipsum labore minima odio soluta totam!</p>
                <Button className='btn_change'>Изменить</Button>
            </div>
        </div>
    )
}

export default Film;