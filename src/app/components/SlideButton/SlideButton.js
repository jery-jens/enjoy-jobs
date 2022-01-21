import React, { useState } from 'react';

import './_SlideButton.scss';

const SlideButton = ({action, text, icon, id}) => {
    const [ status, setStatus ] = useState(false);

    const animateButton = () => {
        const result = action();

        if (result === false) {
            setStatus(true);
        };
    };

    return (
        <div className={`slide-button ${status ? status : ''}`} id={id} onClick={animateButton}>
            <div className="slide-button__icon">
                <img src={icon} alt="icon" />
            </div>
            <p>{text}</p>
        </div>
    )
};

export default SlideButton;