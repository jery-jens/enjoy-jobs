import React, { useState } from 'react';
import Moment from 'moment';
import 'moment/locale/nl-be';

import { InputDate, InputSearch, InputSelect, InputText } from '../../../components';
import ProfileGridMob from './ProfileGridMob';
import { useAPI } from '../../../services';

import DateIcon from '../../../assets/icons/date.svg';

import './_ProfileGrid.scss';

const ProfileGrid = ({items, inputs, section, update}) => {
    const [ showAdd, setShowAdd ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorText, setErrorText ] = useState();

    // eslint-disable-next-line
    const [ profileForm, setProfileForm ] = useState(
        section === 'Opleiding' ? (
            {
                "from": "",
                "till": "",
                "at": "",
                "vdab_study_id": "",
                "weight": items.length + 1,
                "location": "",
                "succesful": 1,
                "description": "",
                "education_level_id": ""
            }
        ) : section === 'Cursus' ? (
            {
                "from": "",
                "till": "",
                "course": "",
                "weight": items.length + 1,
                "succesful": 1,
                "currentjob": 0,
            }
        ) : section === 'Ervaring' ? (
            {
                "weight": items.length + 1,
                "employer": "",
                "vdab_template_id": "",
                "experience": "",
                "location": "",
                "from": "",
                "till": "",
                "name": "",
            }
        ) : section === 'Taal' ? (
            {
                "weight": items.length + 1,
                "level": 10,
                "vdab_language_id": "",
            }
        ) : section === 'Rijbewijs' ? (
            {
                "weight": items.length + 1,
                "vdab_drivers_license_id": "",
            }
        ) : section === 'Competentie' ? (
            {
                "weight": items.length + 1,
                "experience": "GEEN",
                "description": "",
            }
        ) : section === 'Hobby of interesse' ? (
            {
                "hobby": "",
            }
        ) : ''
    );

    const { currentUser, postList, deleteList } = useAPI();
    const today = Moment(Date.now()).format("DD-MM-YYYY");

    const setForm = (id, item) => {
        const splittedId = id.split('-');
        profileForm[splittedId[1]] = item; 
    };

    const submitItem = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        document.body.style.cursor = 'wait';

        if (section === "Opleiding") {
            formData.append("from", profileForm.from);
            formData.append("till", profileForm.till ?? today);
            formData.append("at", profileForm.at);
            formData.append("description", profileForm.description);
            formData.append("education_level_id", profileForm.education_level_id);
            formData.append("weight", profileForm.weight);
            formData.append("location", profileForm.location);
            formData.append("succesful", profileForm.succesful);
            
            setError(false);
            setErrorText('');

            const response = await postList('study', currentUser, formData);

            if (response) {
                document.body.style.cursor = 'auto';
                update();
            };
        } else if (section === "Cursus") {
            formData.append("from", profileForm.from);
            formData.append("till", profileForm.till ?? today);
            formData.append("weight", profileForm.weight);
            formData.append("course", profileForm.description);
            formData.append("succesful", profileForm.succesful);
            formData.append("currentjob", profileForm.till ? 1 : 0);
            
            setError(false);
            setErrorText('');

            const response = await postList('course', currentUser, formData);

            if (response) {
                document.body.style.cursor = 'auto';
                update();
            };
        } else if (section === "Ervaring") {
            if (profileForm.name.length === 0) {
                setError(true);
                setErrorText('geen job gekozen');
                document.body.style.cursor = 'auto';
                return;
            };

            let diffYears = Moment(profileForm.till ? profileForm.till : today).diff(Moment(profileForm.from), 'years');
            let experience;

            if (diffYears < 2 || !diffYears) {
                experience = 'MINDER_DAN_2_JAAR';
            };

            if (diffYears <= 5 && diffYears >= 2) {
                experience = 'TUSSEN_2_EN_5_JAAR';
            };

            if (diffYears < 5) {
                experience = 'MEER_DAN_5_JAAR';
            };

            formData.append("from", profileForm.from);
            formData.append("till", profileForm.till ?? today);
            formData.append("weight", profileForm.weight);
            formData.append("employer", profileForm.employer);
            formData.append("vdab_template_id", profileForm.vdab_template_id);
            formData.append("experience", experience);
            formData.append("location", profileForm.location);
            formData.append("name", profileForm.name);
            
            setError(false);
            setErrorText('');

            const response = await postList('experience', currentUser, formData);

            if (response.status === 1) {
                document.body.style.cursor = 'auto';
                update();
            } else {
                setError(true);
                setErrorText('ongeldige ervaring');
                return;
            }
        } else if (section === 'Taal') {
            if (profileForm.vdab_language_id.length === 0) {
                setError(true);
                setErrorText('geen taal gekozen');
                document.body.style.cursor = 'auto';
                return;
            };

            formData.append("level", profileForm.level);
            formData.append("vdab_language_id", profileForm.vdab_language_id);
            formData.append("weight", profileForm.weight);
            
            setError(false);
            setErrorText('');

            const response = await postList('language', currentUser, formData);

            if (response) {
                document.body.style.cursor = 'auto';
                update();
            };
        } else if (section === 'Rijbewijs') {
            if (profileForm.vdab_drivers_license_id.length === 0) {
                setError(true);
                setErrorText('geen rijbewijs gekozen');

                document.body.style.cursor = 'auto';
                return;
            };

            formData.append("vdab_drivers_license_id", profileForm.vdab_drivers_license_id);
            formData.append("weight", profileForm.weight);

            setError(false);
            setErrorText('');

            const response = await postList('driverslicense', currentUser, formData);

            if (response) {
                document.body.style.cursor = 'auto';
                update();
            };
        } else if (section === 'Competentie') {
            formData.append("weight", profileForm.weight);
            formData.append("description", profileForm.description);
            formData.append("name", profileForm.name);
            formData.append("experience", profileForm.experience);

            setError(false);
            setErrorText('');

            const response = await postList('competence', currentUser, formData);

            if (response) {
                document.body.style.cursor = 'auto';
                update();
            };
        } else if (section === 'Hobby of interesse') {
            if (profileForm.hobby.length === 0) {
                setError(true);
                setErrorText('geen hobby/interesse gekozen');

                document.body.style.cursor = 'auto';
                return;
            };

            formData.append("hobby", profileForm.hobby);

            setError(false);
            setErrorText('');

            const response = await postList('hobby', currentUser, formData);

            if (response) {
                document.body.style.cursor = 'auto';
                update();
            };
        } else {
            setError(true);
            setErrorText('ongeldig');
        };
    };

    const deleteItem = async (id) => {
        if (section === "Opleiding") {
            await deleteList('study', currentUser, id);
            update();
        } else if (section === "Cursus") {
            await deleteList('course', currentUser, id);
            update();
        } else if (section === "Ervaring") {
            await deleteList('experience', currentUser, id);
            update();
        } else if (section === 'Taal') {
            await deleteList('language', currentUser, id);
            update();
        } else if (section === 'Rijbewijs') {
            await deleteList('driverslicense', currentUser, id);
            update();
        } else if (section === 'Competentie') {
            await deleteList('competence', currentUser, id);
            update();
        } else if (section === 'Hobby of interesse') {
            await deleteList('hobby', currentUser, id);
            update();
        } else {
            setError(true);
        };
    };

    const InputField = ({element, index}) => {
        const [ now, setNow ] = useState(false);

        return <div className="col-12">
            {
                element.type === "text" ? (
                    <InputText
                        label={element.label}
                        id={`${element.id}`}
                        action={(e) => setForm(e.target.id, e.target.value)}
                    />                                                    
                ) : ''
            }
            {
                element.type === "date" ? (
                    element.label === "Tot" ? (
                        <div>
                            <div className="select-now">
                                Tot op heden?

                                <div className={`select-now--check${now ? ' checked' : ''}`} onClick={() => setNow(!now)}>

                                </div>
                            </div>
                            {
                                now ? (
                                    ''
                                ) : (
                                    <InputDate 
                                        label={element.label}
                                        id={`${element.id}`}
                                        icon={DateIcon}
                                        action={(e) => setForm(e.target.id, e.target.value)}
                                    />
                                )
                            }
                        </div>
                    ) : (
                        <InputDate 
                            label={element.label}
                            id={`${element.id}`}
                            icon={DateIcon}
                            action={(e) => setForm(e.target.id, e.target.value)}
                        />
                    )
                ) : ''
            }
            {
                element.type === "select" ? (
                    <InputSelect
                        label={element.label}
                        id={`${element.id}`}
                        secondId={element.secondId}
                        options={element.items}
                        setProfile={setForm}
                        backoffice={true}
                        value={element.items[0].value}
                    />
                ) : ''
            }
            {
                element.type === "search" ? (
                    <InputSearch
                        label={element.label}
                        id={element.id}
                        values={element.items}
                        setValue={setForm}
                    />
                ) : ''
            }
        </div>
    }

    return (
        <div className="row">
            <div className="col-12">
                    {
                        items ? items.length !== 0 ? items.map((element, index) => {
                            return (
                                <ProfileGridMob key={index}
                                    index={index}
                                    section={section}
                                    element={element}
                                    deleteItem={deleteItem}
                                />
                            )
                        }) : (
                            <div className="profile-grid-mob__no-items d-block">
                                Geen gegevens voorlopig
                            </div>
                        ) : ''
                    }
                    {
                        showAdd ? (
                            <div className="profile-grid-mob__add-form">
                                <h6 className="profile-grid-mob__add-form--title">
                                    {section + ' toevoegen'} 
                                </h6>
                                <form className="profile-grid-mob__add-form--holder">
                                    <div className="row">
                                    {
                                        inputs.map((element, index) => {
                                            return <InputField key={index} element={element} index={index} />
                                        })
                                    }
                                    </div>
                                    <div className="profile-grid-mob__add-form--holder__submit d-flex align-items-center">
                                        <button type="submit" onClick={(e) => submitItem(e)}>
                                            Opslaan
                                        </button>
                                        <span onClick={() => setShowAdd(false)}>
                                            Annuleer
                                        </span>
                                    </div>
                                </form>
                                {
                                    error ? (
                                        <div className="profile-grid-mob__add-form--holder__error">
                                            {section} kon niet worden opgeslagen: {errorText}
                                        </div>
                                    ) : (
                                        ''
                                    )
                                }
                            </div>
                        ) : (
                            <div className="profile-grid-mob__add d-inline-block" onClick={() => setShowAdd(!showAdd)}>
                                {section} toevoegen...
                            </div>
                        )
                    }
            </div>
        </div>
    )
};

export default ProfileGrid;