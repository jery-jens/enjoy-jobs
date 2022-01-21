import React, { useState, useEffect } from 'react';

import './InputText.scss'

const InputText = (props) => {
    const [ active, setActive ] = useState(false);

    const blur = () => {
        const inputValue = document.getElementById(props.id).value;
        if (inputValue === '') setActive(false); 
    };

    useEffect(() => {
        if (document.getElementById(props.id).value !== "") {
            setActive(true);
        }

        // get background color 
        let nextParent = document.getElementById(props.id).parentElement;

        while (window.getComputedStyle(nextParent).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' && nextParent !== document.documentElement) {
            nextParent = nextParent.parentElement;
        }

        let bgColor = window.getComputedStyle(nextParent).getPropertyValue('background-color');
        if (bgColor === 'rgba(0, 0, 0, 0)') bgColor = 'rgba(255, 255, 255, 1)';
        // set bg color of label
        document.getElementById(`label-${props.id}`).style.backgroundColor = bgColor;
        
    }, [props.id, props.value]);

    return (
        <div className="input-text">
            <label className={`input-text__label ${(active)?'input-text__label--active':''}`} id={`label-${props.id}`}>{props.label}</label>
            {
                props.enterAction ? (
                    <input className={`input-text__input ${(active)?'input-text__input--active':''} ${(props.borderColor)?`input-textarea__input--${props.borderColor}-border`:''}`}
                        type="text" 
                        id={props.id} 
                        defaultValue={props.value ? props.value : ''}
                        onChange={props.action}
                        onFocus={()=>setActive(true)}
                        onBlur={blur} 
                        required
                        autoComplete="off"
                        onKeyPress={(e) => props.enterAction(e.key)}
                    /> 
                ) : (
                    <input className={`input-text__input ${(active)?'input-text__input--active':''} ${(props.borderColor)?`input-textarea__input--${props.borderColor}-border`:''}`}
                        type="text" 
                        id={props.id} 
                        defaultValue={props.value ? props.value : ''}
                        onChange={props.action}
                        onFocus={()=>setActive(true)}
                        onBlur={blur} 
                        required
                        autoComplete="off"
                    /> 
                )
            }
        </div>
    )
}

export default InputText;