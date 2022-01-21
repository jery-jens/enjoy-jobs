import React from 'react';

import './VacancyContent.scss'

const VacancyContent = (props) => {
    return (
        <div className="vacancy-detail-container">
            {
                (props.title) 
                ? 
                <div className="vacancy-detail__head">
                    <h1>{props.title}</h1>
                    <div className="vacancy-detail-head__sub-title-container">
                        <h3>{props.location}</h3>
                        <div>
                            <span>{props.sector}</span>
                            <span>Ref: {props.refNr}</span>
                        </div>
                    </div>
                </div>
                :<p className="error-message">Selecteer een vacature</p>
            }
            <div className={`vacancy-detail__description ${(!props.overflow) ? "vacancy-detail__description--no-overflow" : ""}`} dangerouslySetInnerHTML={(props.text) ? {__html: props.text} : {__html: ""}}>
                
            </div>
        </div>
    );
};

export default VacancyContent;