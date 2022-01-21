import React, { useState, useEffect } from 'react';

import './InputTextArea.scss'

const InputTextArea = (props) => {
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
        <div className="input-textarea" style={{height: props.height}}>
            <label className={`input-textarea__label ${(active)?'input-textarea__label--active':''}`} id={`label-${props.id}`}>{props.label}</label>
            <textarea 
                className={`input-textarea__input ${(active)?'input-textarea__input--active':''} ${(props.borderColor)?`input-textarea__input--${props.borderColor}-border`:''}`} 
                type="textarea" id={props.id} defaultValue={props.value ? props.value : ''} 
                onChange={props.action} 
                onFocus={()=>setActive(true)} 
                onBlur={blur}
            /> 
        </div>
    )
}

export default InputTextArea;