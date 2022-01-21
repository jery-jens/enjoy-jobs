import React from 'react';

import './BasicButton.scss';

const BasicButton = (props) => {
    return (
        <input 
            type="button" 
            className={`basic-button bg-${props.level}`} 
            value={props.value} 
            onClick={props.onClick}
        />
    );
}

export default BasicButton;