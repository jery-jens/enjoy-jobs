import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { InputFile, InputText, InputTextArea, SlideButton } from '../../components';
import { useToolbox, useAPI } from '../../services';
import { Layout } from '../../layouts';

import arrow from '../../assets/icons/next.svg'

import './Apply.scss';

const Apply = () => {
    document.title = 'Enjoy Jobs | Solliciteer';

    const { state } = useLocation();
    const history = useHistory();
    const id = state ? state.id : false;

    const [ selectedVacancy, setSelectedVacancy ] = useState(false);
    const [ applyWithAccount, setApplyWithAccount ] = useState(false);

    const [ userInfo, setUserInfo ] = useState();
    const [ msg, setMsg ] = useState();
    const [ error, setError ] = useState();
    const [ confirm, setConfirm ] = useState();

    const { getVacancy, viewUserInformation, currentUser, apply } = useAPI();
    const { getCSSSizeModifier } = useToolbox();

    const fetchData = useCallback(async () => {
        if (applyWithAccount && !userInfo) {
            const user = await viewUserInformation(currentUser);
            if (user.name === 'Unauthorized') {
                setMsg('Gelieve eerst in te loggen om met je account te solliciteren.');
            } else {
                setUserInfo(user);
            };
        };

        if (!id) {
            history.push('/not-found');
        };

        const vacancy = await getVacancy(id);
        setSelectedVacancy(vacancy);

        setMsg();
        setConfirm();
        setError();

    }, [currentUser, viewUserInformation, getVacancy, id, applyWithAccount, userInfo, history]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const sendApplication = async (  ) => {
        const name = document.getElementById('firstname').value + ' ' + document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('telephone').value;
        const subject = 'Sollicitatie via contactformulier';
        const body = document.getElementById('message').value;
        const file = document.getElementById('apply-files').files.length !== 0 ? document.getElementById('apply-files').files[0] : null;
        const vacancy_id = id;


        if (name && email && mobile && subject && body && vacancy_id) {
            document.body.style.cursor = 'wait';

            setError();
            setConfirm('Sollicitatie wordt verstuurd...');
            
            const application = await apply(
                name, 
                email, 
                mobile, 
                body, 
                file ? file : '', 
                vacancy_id, 
                (applyWithAccount) ? currentUser : null
            );

            document.body.style.cursor = 'auto';
            
            if (application.errors && application.errors.email) {
                setError(application.errors.email[0])
            } else {
                history.push(
                    '/apply-succes', 
                    {
                        telephone: mobile,
                        email,
                    },
                );
            };
        } else {
            setError('Gelieve alle vereiste velden in te vullen.')
        };
    }

    return selectedVacancy ? (
        <Layout>
            <div className={`apply ${getCSSSizeModifier('apply')} container`}>
                <div className="apply-sidebar col-12 col-lg-4">
                    <h1>Solliciteer hier</h1>
                    <div className="apply-sidebar__vacany-info">
                        <p>{selectedVacancy.city}</p>
                        <h2>{selectedVacancy.name}</h2>
                    </div>
                    {
                        currentUser && (
                            <div className="apply-sidebar__apply-options d-none d-lg-block">
                                <h3>Hoe wil je solliciteren?</h3>
                                <ul>
                                    <li className={`applying-option applying-option${(applyWithAccount)? '--active': ''}`} onClick={() => {setApplyWithAccount(true)}}>
                                        <div>
                                            <p className="option-title" onClick={() => {setApplyWithAccount(true)}}>Accountgegevens</p> 
                                            <p>De gegevens in jouw account worden gebruikt om je sollicitatie te veranderen</p>
                                        </div>
                                    </li>
                                    <li className={`applying-option applying-option${(!applyWithAccount)? '--active': ''}`}>
                                        <p className="option-title" onClick={() => {setApplyWithAccount(false)}}>Handmatig invoeren</p>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
                <form className="apply-form-container col-12 col-lg-8">
                    {
                        currentUser && (
                            <div className="application-switch d-flex d-lg-none">
                                <div className={`select-${(applyWithAccount) ? 'right' : 'left'}`}>
                                    <p onClick={() => {setApplyWithAccount(false)}}>Handmatig</p>
                                    <p onClick={() => {setApplyWithAccount(true)}}>Account</p>
                                </div>
                            </div>
                        )
                    }
                    <div className="form-subcontainer col-12">
                        <h1 className="d-none d-lg-block">Jouw sollicitatie</h1>
                        <p className="msg">{msg}</p>
                        {
                            (applyWithAccount)?
                            <p className="account-info">We gebruiken jouw account gegevens om deze sollicitatie te verzenden. <a href="/profile">Bekijk hier jouw account gegevens.</a><br/>
                                Je kan nog steeds extra bestanden, zoals een cv of motivatiebrief, uploaden onderaaan het formulier. </p>

                            : null
                        }
                    </div>
                    
                    <div className="form-subcontainer col-12 col-lg-6" >
                        <InputText 
                            id="firstname"
                            label="Voornaam *"
                            borderColor="blue"
                            value={(userInfo && applyWithAccount) ? userInfo.firstname: undefined}
                        />
                    </div>
                    <div className="form-subcontainer col-12 col-lg-6" >
                        <InputText 
                            id="lastname"
                            label="Achternaam *"
                            borderColor="blue"
                            value={(userInfo && applyWithAccount) ? userInfo.name: null}
                        />
                    </div>

                    <div className="form-subcontainer col-12 col-lg-6" >
                        <InputText 
                            id="email"
                            label="E-mail *"
                            borderColor="blue"
                            value={(userInfo && applyWithAccount) ? userInfo.email2: null}
                        />
                    </div>

                    <div className="form-subcontainer col-12 col-lg-6" >
                        <InputText 
                            id="telephone"
                            label="Telefoon *"
                            borderColor="blue"
                            value={(userInfo && applyWithAccount) ? userInfo.mobile: null}
                        />
                    </div>
                    <div className="form-subcontainer col-12 col-lg-6" >
                        <InputText 
                            id="linkedin"
                            label="Jouw linkedin link *"
                            borderColor="blue"
                            value={(userInfo && applyWithAccount) ? userInfo.linkedin: null}
                        />
                    </div>
                    <div className="form-subcontainer col-12" >
                        <InputTextArea
                            id="message"
                            label="Jouw bericht"
                            borderColor="blue"
                            // eslint-disable-next-line
                            value={`Dag Sophie, dag Fien,\n \n Hierbij had ik graag gesolliciteerd op de vacature \"${selectedVacancy ? selectedVacancy.name : 'niets'}\"\n \n Gelieve mij te contacteren.`}
                        />
                    </div>
                    <div className="form-file-container col-12">
                        <InputFile
                            id="apply-files"
                            label="Laad hier je cv en andere bestanden op"
                        />
                    </div>

                    <div className="form-subcontainer ml-auto col-auto">
                        <SlideButton
                            id="submit"
                            icon={arrow}
                            text="Verzend sollicitatie"
                            action={sendApplication}
                        />
                    </div>
                    {
                        (error)
                        ?
                        <div className="col-12">
                            <p className="error">{error}</p>
                        </div>
                        :null
                    }
                    {
                        (confirm && !error)
                        ?
                        <div className="col-12">
                            <p className="confirmation">{confirm}</p>
                        </div>
                        :null
                    }
                </form>
            </div>
        </Layout>
    ) : ''
};

export default Apply;