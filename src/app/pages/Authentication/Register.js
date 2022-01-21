import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAPI } from '../../services';

import { Layout } from '../../layouts';
import { AuthError, InputMail, InputPass, InputText, SlideButton } from '../../components';

import Check from '../../assets/icons/check.svg';
import Next from '../../assets/icons/next.svg';

import './_Authentication.scss';

const Register = () => {
    document.title = 'Registreren';
    document.querySelector('meta[name="description"]').setAttribute("content", "Heb je nog geen account? Registreer je hier! ");

    const history = useHistory();

    const [ succes, setSucces ] = useState(false);
    const [ authError, setAuthError ] = useState({
        'status': false,
        'message': '',
    });

    const { registerUserWithApi, currentUser, refreshService } = useAPI();

    const [ registerForm, setRegisterForm ] = useState({
        'auth-mail': '',
        'auth-username': '',
        'auth-firstName': '',
        'auth-lastName': '',
        'auth-password': '',
        'auth-passwordRepeat': '',
    });

    useEffect(() => {
        if (currentUser) {
            history.push('/profile');
        };
    }, [currentUser, history]);

    const changeForms = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.id]: e.target.value,
        });
    }; 

    const nextStep = (current, next, caseFunction) => {
        const forms = document.getElementsByClassName('form-container');

        if (caseFunction === 'account') {
            // Check if mail is valid
            const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (registerForm["auth-mail"].length === 0) {
                setAuthError({
                    status: true,
                    message: 'Gelieve een geldig e-mailadres in te vullen.',
                });

                return;
            };

            if (registerForm["auth-username"].length === 0) {
                setAuthError({
                    status: true,
                    message: 'Gelieve een geldige gebruikersnaam in te vullen.',
                });

                return;
            };

            if (!mailformat.test(registerForm["auth-mail"])) {
                setAuthError({
                    status: true,
                    message: 'Gelieve een geldig e-mailadres in te vullen.',
                });

                return;
            };
        } else if (caseFunction === 'name') {
            // Check if fields are filled in
            if (registerForm["auth-firstName"].length === 0) {
                setAuthError({
                    status: true,
                    message: 'Gelieve een geldige voornaam in te vullen.',
                });

                return;
            };

            if (registerForm["auth-lastName"].length === 0) {
                setAuthError({
                    status: true,
                    message: 'Gelieve een geldige achternaam in te vullen.',
                });

                return;
            };
        } else if (caseFunction === 'password') {
            // Check if password is valid
            if (registerForm["auth-password"].length < 8 || registerForm["auth-passwordRepeat"].length < 8) {
                setAuthError({
                    status: true,
                    message: 'Gelieve een geldig wachtwoord in te vullen',
                });

                return;
            };

            // Check if password and password repeat are the same
            if (registerForm["auth-password"] !== registerForm["auth-passwordRepeat"]) {
                setAuthError({
                    status: true,
                    message: 'De ingevulde wachtwoorden lijken niet op elkaar.'
                });

                return;
            };
        };

        setAuthError({
            status: false,
            message: '',
        });

        if (current === 2) {
            registerUser();
        } else {
            // Go to the next form
            for(let i = 0; i < forms.length; i++) {
                if (i === current) {
                    forms[i].classList.add('next-form');
                    setTimeout(() => {
                        forms[i].classList.add('hidden-form');
                    }, 500);
                } else if (i === next) {
                    setTimeout(() => {
                        forms[i].classList.remove('hidden-form');
                        forms[i].classList.remove('next-form');
                        forms[i].style.opacity = 0;

                        setTimeout(() => {
                            forms[i].style.opacity = 1;
                        }, 500);
                    }, 500);
                };
            };
        };
    };

    const previousStep = (current, previous) => {
        const forms = document.getElementsByClassName('form-container');

        if (current === 0) {
            // No more going back
            return;
        } else {
            // Go to the previous form
            for(let i = 0; i < forms.length; i++) {
                if (i === current) {
                    forms[i].classList.add('next-form');
                    setTimeout(() => {
                        forms[i].classList.add('hidden-form');
                    }, 500);
                } else if (i === previous) {
                    setTimeout(() => {
                        forms[i].classList.remove('hidden-form');
                        forms[i].classList.remove('next-form');
                        forms[i].style.opacity = 0;

                        setTimeout(() => {
                            forms[i].style.opacity = 1;
                        }, 500);
                    }, 500);
                };
            };
        };
    };

    const registerUser = async () => {
        // Register the user
        const user = await registerUserWithApi(registerForm['auth-username'], registerForm['auth-password'], registerForm['auth-mail'], registerForm['auth-firstName'], registerForm['auth-lastName']);

        // Check if registration works
        if (!user && !user.isSuccess && user.isSuccess !== 201) {
            setAuthError({
                status: true,
                message: 'Dit account kon niet geregistreerd worden',
            });
            document.body.style.cursor = 'auto';

            return;
        };

        setSucces(true);
        document.body.style.cursor = 'auto';
        refreshService();

        setTimeout(() => {
            history.push('/profile');
            window.location.reload();
        }, 5000);
    };

    return (
        <Layout>
            <section className="authentication register">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            {
                                succes ? (
                                    <div className="succes-holder">
                                        <h1>Registratie succesvol!</h1>
                                        <p>Je word zodadelijk omgeleid naar jouw persoonlijke pagina. Even geduld.</p>
                                        <div className="succes-holder__icon">
                                            <img src={Check} alt="check" />
                                        </div>
                                    </div>  
                                ) : (
                                    <div className="forms-holder">
                                        <h1>Registratie</h1>
                                        <div className="form-container">
                                            <p className="authentication__text">Maak een account aan en geniet van de voordelen.</p>
                                            {
                                                authError.status ? 
                                                    <AuthError 
                                                        text={authError.message}
                                                    /> 
                                                : ''
                                                }
                                                <InputMail 
                                                    label="Jouw e-mail"
                                                    id="auth-mail"
                                                    action={(e) => changeForms(e)}
                                                />
                                                <InputText 
                                                    label="Jouw gebruikersnaam"
                                                    id="auth-username"
                                                    action={(e) => changeForms(e)}
                                                />
                                                <div className="authentication__button">
                                                    <SlideButton
                                                        id="auth-slide"
                                                        icon={Next}
                                                        text="Volgende stap" 
                                                        action={() => nextStep(0, 1, 'account')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-container hidden-form">
                                                <p className="authentication__text">Vertel ons wat meer over jezelf.</p>
                                                    {
                                                        authError.status ? 
                                                            <AuthError 
                                                                text={authError.message}
                                                            /> 
                                                        : ''
                                                    }
                                                    <InputText 
                                                        label="Jouw voornaam"
                                                        id="auth-firstName"
                                                        action={(e) => changeForms(e)}
                                                    />
                                                    <InputText 
                                                        label="Jouw achternaam"
                                                        id="auth-lastName"
                                                        action={(e) => changeForms(e)}
                                                    />
                                                    <div className="authentication__button">
                                                        <div className="slide-button-container">
                                                            <SlideButton
                                                                id="auth-slide"
                                                                icon={Next}
                                                                text="Volgende stap" 
                                                                action={() => nextStep(1, 2, 'name')}
                                                            /> 
                                                            <p onClick={() => previousStep(1, 0)}>Of keer een stap terug</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-container hidden-form">
                                                    <p className="authentication__text">Kies een sterk en goed te onthouden wachtwoord.<br/><strong>Let op! Maak gebruik van minimaal 8 karakters.</strong></p>
                                                    {
                                                        authError.status ? 
                                                            <AuthError 
                                                                text={authError.message}
                                                            /> 
                                                            : ''
                                                    }
                                                    <InputPass 
                                                        label="Jouw wachtwoord"
                                                        id="auth-password"
                                                        action={(e) => changeForms(e)}
                                                    />
                                                    <InputPass 
                                                        label="Herhaal jouw wachtwoord"
                                                        id="auth-passwordRepeat"
                                                        action={(e) => changeForms(e)}
                                                    />
                                                    <div className="authentication__button">
                                                        <div className="slide-button-container">
                                                            <SlideButton
                                                                id="auth-slide"
                                                                icon={Next}
                                                                text="Registreer" 
                                                                action={() => nextStep(2, 3, 'password')}
                                                            /> 
                                                            <p onClick={() => previousStep(2, 1)}>Of keer een stap terug</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                   
                                )
                            }
                        </div>
                    </div>
                </div>                
            </section>
        </Layout>
    )
};

export default Register;