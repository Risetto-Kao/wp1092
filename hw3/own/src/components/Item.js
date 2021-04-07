import React from "react";


export default ({detail})=>(
    <li className='todo-app__item'>
        <div className='todo-app__checkbox'></div>
        <h1 className='todo-app__item-detail'>{detail}</h1>
        <img className='todo-app__item-x' src='./img/x.png'></img>
    </li>
);