import React, { useEffect, useState } from 'react';

import './InputSearch.scss';

const InputSearch = ({ values, setValue, defaultValue, id, label, borderColor }) => {
  const [ searchedInput, setSearchedInput ] = useState([]);
  const [ inputLength, setInputLength ] = useState(0);
  const [ inputText, setInputText ] = useState(defaultValue ? defaultValue : '');
  const [ active, setActive ] = useState(false);
  const [ show, setShow ] = useState(false);
  const [ defaultLabel, setDefaultLabel ] = useState();

  useEffect(() => {
    if (defaultValue) {
      for (let i = 0; i < values.length; i++) {
        if (values[i].value === defaultValue) {
          setDefaultLabel(values[i].label);
        };
      };
    };
  }, [defaultValue, values]);

  const watchChange = (e) => {
    let foundValues = [];

    setInputLength(e.target.value.length);
    setInputText(e.target.value);
    setValue(id, '');
    setShow(true);
    setDefaultLabel('');

    for (let i = 0; i < values.length; i++) {
      if (values[i].label.toLowerCase().includes(e.target.value.toLowerCase())) {
        foundValues.push(values[i]);
      };
    };

    setSearchedInput(foundValues);
  };

  const clickValue = (element) => {
    setValue(id, element.value);
    setInputText(element.label);
    setShow(false);
  };

  const blur = () => {
    const inputValue = document.getElementById(id).value;
    if (inputValue === '') setActive(false); 
  };

  useEffect(() => {
    if (document.getElementById(id).value !== "") {
      setActive(true);
    };

    // get background color 
    let nextParent = document.getElementById(id).parentElement;

    while (window.getComputedStyle(nextParent).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' && nextParent !== document.documentElement) {
      nextParent = nextParent.parentElement;
    };

    let bgColor = window.getComputedStyle(nextParent).getPropertyValue('background-color');
    if (bgColor === 'rgba(0, 0, 0, 0)') bgColor = 'rgba(255, 255, 255, 1)';
    // set bg color of label
    document.getElementById(`label-${id}`).style.backgroundColor = bgColor;
    
  }, [id, defaultValue]);

  return (
    <div className="input-search-wrapper">
      <div className="input-search">
        <label className={`input-search__label ${(active)?'input-search__label--active':''}`} id={`label-${id}`}>{label}</label>
        <input className={`input-search__input ${(active)?'input-search__input--active':''} ${(borderColor)?`input-search__input--${borderColor}-border`:''}`} type="text" id={id} onFocus={() => setActive(true)} value={defaultLabel ? defaultLabel : inputText} onChange={(e) => watchChange(e)} onBlur={blur} required autoComplete="off" />
      </div>
        {
          show && inputLength !== 0 && (
            <ul className="input-search-wrapper__results">
              {
                searchedInput.length !== 0 ? searchedInput.map((element, index) => {
                  return <li onClick={() => clickValue(element)} key={index}>{label === "Rijbewijs" ? `${element.value}: ${element.label}` : element.label}</li>
                }) : <p>Geen resultaat! Probeer een andere zoekterm.</p>
              }
            </ul>
          )
        }
    </div>
  );
};

export default InputSearch;