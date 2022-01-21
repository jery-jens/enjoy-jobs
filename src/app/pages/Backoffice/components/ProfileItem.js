import React, { useState } from 'react';

import Down from '../../../assets/icons/down.svg';

import './_ProfileItem.scss';

const ProfileItem = ({children, info}) => {
    const [ stateItem, setStateItem ] = useState(true);

    return (
        <div className={`profile__item ${stateItem ? ('active-item') : ('')}`}>
            <div className="row">
                <div className="col-12 profile__item--top">
                    <h5>{info.title}</h5>
                    <span className="profile__item--top--button" onClick={() => setStateItem(!stateItem)}>
                        <img src={Down} alt="down" />
                    </span>
                </div>
            </div>
            {
                stateItem ? (
                    <div className="profile__item--content">
                        {
                            children
                        }
                    </div>
                ) : (
                    ''
                )
            }
        </div>
    )
};

export default ProfileItem;