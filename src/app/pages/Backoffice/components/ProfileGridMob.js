import React, { useState } from 'react';

import Delete from '../../../assets/icons/delete.svg';
import Down from '../../../assets/icons/down.svg';

const ProfileGridMob = ({index, section, element, deleteItem}) => {
    const [ openStatus, setOpenStatus ] = useState(true);

    return (
        <div className="profile-grid d-block">
            <div className="profile-grid__head">
                <div className={`profile-grid__head--open ${openStatus ? 'open-grid':  ''}`}>
                    <span onClick={() => setOpenStatus(!openStatus)}>
                        <img src={Down} alt="down" />
                    </span>
                    <p>{section} #{index+1}</p>
                </div>
                <div className="d-flex">
                    <img src={Delete} onClick={() => deleteItem(element.id)} alt="delete" className="profile-grid__head--delete" />
                </div>
            </div>

            {
                openStatus && (
                    <div className="profile-grid__body">
                        {
                            Object.keys(element).map((innerElement, innerIndex) => {
                                return element[innerElement] && innerElement !== 'id' ? innerElement !== 'weight' ? innerElement !== 'vdab_study_id' ? innerElement !== 'vdab_template_id' ? innerElement !== 'experience' ? innerElement !== 'vdab_language_id' ? innerElement !== 'vdab_drivers_license_id' ? innerElement !== 'vdab_activity_id' ? (
                                    <div className="d-flex align-items-center" key={innerIndex}>
                                        <p className="profile-grid__body--name">
                                            <strong>
                                                {
                                                    innerElement === 'course' ? (
                                                        'Cursus'
                                                    ) : innerElement === 'from' ? (
                                                        'Van'
                                                    ) : innerElement === 'till' ? (
                                                        'Tot'
                                                    ) : innerElement === 'succesful' ? (
                                                        'Behaald'
                                                    ) : innerElement === 'at' ? (
                                                        'Op'
                                                    ) : innerElement === 'location' ? (
                                                        'Locatie'
                                                    ) : innerElement === 'name' ? (
                                                        'Naam'
                                                    ) : innerElement === 'description' ? (
                                                        'Beschrijving'
                                                    ) : innerElement === 'employer' ? (
                                                        'Werkgever'
                                                    ) : innerElement === 'level' ? (
                                                        'Niveau (0-10)'
                                                    ) : innerElement === 'hobby' ? (
                                                        'Hobby'
                                                    ) : innerElement === "currentjob" ? (
                                                        "Tot op heden"
                                                    ) : innerElement === "education_level_id" ? (
                                                        "Niveau"
                                                    ) : ""
                                                }
                                            </strong>
                                        </p>
                                        <p className="profile-grid__body--value">
                                        {   
                                            element[innerElement] === 0 ? (
                                                'Nee'
                                            ) : element[innerElement] === 1 ? (
                                                'Ja'
                                            ) : element[innerElement]
                                        }
                                        </p>
                                    </div>
                                ) : '' : '' : '' : '' : '' : '' : '' : ''
                            })
                        }
                    </div>
                )
            }
        </div>
    )
};

export default ProfileGridMob;