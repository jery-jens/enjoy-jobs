import React from 'react';

import './VacancyCard.scss';
import { useToolbox } from '../../../services';

const VacancyCard = (props) => {
    const { getCSSSizeModifier } = useToolbox();
    return(
        <div className={`vacancy-card ${(props.isSelected) ? "vacancy-card--selected" : ""} ${getCSSSizeModifier('vacancy-card')}`} onClick={props.onClick} >
            <h3>{props.location}</h3>
            <h2>{props.title}</h2>
            <div className="vacancy-card__info-container">
                <div className="vacancy-card-info__info">
                    <span>Type</span> <p>{props.type}</p>
                </div>
                <div className="vacancy-card-info__info">
                    <span>Duur</span> <p>{props.duration}</p>      
                </div>
                <span>Ref.Nr {props.refNr}</span>
                {/* <input className="vacancy-card-info__read-more" type="button" value="lees meer" onClick={props.onClickDesktop}/> */}
            </div>
            <span className={`vacancy-card__selector ${(props.isSelected) ? "vacancy-card__selector--selected" : ""}`}></span>
        </div>
    );
}

export default VacancyCard; 