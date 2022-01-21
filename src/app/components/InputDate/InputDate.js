import React, { useState, useEffect } from 'react';
import Moment from 'moment';

import './_InputDate.scss'

const InputDate = (props) => {
    const [ active, setActive ] = useState(false);

    const blur = () => {
        const inputValue = document.getElementById(props.id).value;
        if (inputValue === '') setActive(false); 
    };

    useEffect(() => {
        if (document.getElementById(props.id).value !== "") {
            setActive(true);
        };

        // get background color 
        let nextParent = document.getElementById(props.id).parentElement;

        while (window.getComputedStyle(nextParent).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' && nextParent !== document.documentElement) {
            nextParent = nextParent.parentElement;
        };

        let bgColor = window.getComputedStyle(nextParent).getPropertyValue('background-color');
        if (bgColor === 'rgba(0, 0, 0, 0)') bgColor = 'rgba(255, 255, 255, 1)';
        // set bg color of label
        document.getElementById(`label-${props.id}`).style.backgroundColor = bgColor;
        // eslint-disable-next-line
    }, []);

    return (
        <div className="input-date">
            <label className={`input-date__label ${(active)?'input-date__label--active':''}`} id={`label-${props.id}`}>{props.label}</label>
            <input className={`input-date__input ${(active)?'input-date__input--active':''} ${(props.borderColor)?`input-textarea__input--${props.borderColor}-border`:''}`}
                type="date" 
                id={props.id} defaultValue={props.value ? props.value : Moment(Date.now()).format('YYYY-MM-DD')}
                onChange={props.action}
                onFocus={()=>setActive(true)}
                onBlur={blur} 
                required
            /> 
             <img className="input-date__icon" src={props.icon} alt="icon" /> 
        </div>
    )
}

export default InputDate;