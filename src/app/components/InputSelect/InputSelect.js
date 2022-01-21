import React, { useState, useEffect } from 'react';

import './InputSelect.scss';

const InputSelect = (props) => {
    const [ active, setActive ] = useState(false);
    const [ optionsVisible, setOptionsVisible ] = useState(false);
    const [ defaultLabel, setDefaultLabel ] = useState();

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

    const whenFocused = (bool) => {
        const inputValue = document.getElementById(props.id).value;

        if (inputValue === '') {
            setActive(false); 
        } else {
            setActive(true);
        };

        setOptionsVisible(bool);
    };

    const chooseOption = (option) => {
        setActive(true);
        setOptionsVisible(false);
        document.getElementById(props.id).value = option.description ? option.description : option.label; 
        document.getElementById(props.secondId).value = option.id ? option.id : option.value; 

        if (props.backoffice) {
            props.setProfile(props.secondId, option.id ? option.id : option.value);
        };
    };


  useEffect(() => {
    if (props.value) {
      for (let i = 0; i < props.options.length; i++) {
        if (props.options[i].value === props.value) {
          setActive(true);
          setDefaultLabel(props.options[i].label);
        };
      };
    };
  }, [props]);

    return (
        <div className="input-select-wrapper" >
            <div className="input-select">
                <label className={`input-select__label ${(active)?'input-select__label--active':''}`} id={`label-${props.id}`}>{props.label}</label>
                <input 
                    className={`input-select__input ${optionsVisible ? 'active-select' : 'non-active-select'}`} 
                    name={props.name} id={props.id} 
                    defaultValue={defaultLabel ? defaultLabel : ''} 
                    onClick={()=>whenFocused(!optionsVisible)}
                    readOnly
                >
                </input>
                <input type="hidden" id={props.secondId} />
            </div>
            {
                optionsVisible && (
                    <ul className="input-select__options">
                        {
                            props.options.map((option, index) => {
                                return (
                                    <li key={index} onClick={() => chooseOption(option)}>
                                        {option.description ? option.description : option.label}
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default InputSelect;