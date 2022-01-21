import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './_Popup.scss';

import { InputMail, InputPass, SlideButton, InputText, AuthError } from '../../components';

import { useAPI } from '../../services';

import Lock from '../../assets/icons/lock.svg';
import Logo from '../../assets/icons/logoShadow.svg';
import Next from '../../assets/icons/next.svg';
import Check from '../../assets/icons/check.svg';
import Screen from '../../assets/mockup.png';

const AuthPopUp = ({action}) => {
    const history = useHistory();
    const { loginUserWithApi, registerUserWithApi, refreshService } = useAPI();

    const [ type, setType ] = useState(true);
    const [ succes, setSucces ] = useState(false);
    const [ authError, setAuthError ] = useState({
        'status': false,
        'message': '',
    });

    const [ registerForm, setRegisterForm ] = useState({
        'auth-mail': '',
        'auth-username': '',
        'auth-firstName': '',
        'auth-lastName': '',
        'auth-password': '',
        'auth-passwordRepeat': '',
    });

    const [ loginForm, setLoginForm ] = useState({
        'auth-username': '',
        'auth-pass': '',
    });

    const changeForms = (type, e) => {
        if (type === 'login') {
            setLoginForm({
                ...loginForm,
                [e.target.id]: e.target.value,
            });
        } else { 
            setRegisterForm({
                ...registerForm,
                [e.target.id]: e.target.value,
            });
        };
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

    const loginUser = async () => {
        // Check if e-mail or password has been filled in
        document.body.style.cursor = 'wait';

        if (loginForm["auth-username"].length === 0) {
            setAuthError({
                status: true,
                message: 'Het lijkt erop dat u geen gebruikersnaam ingevuld hebt.'
            });
            document.body.style.cursor = 'auto';

            return;
        };

        if (loginForm["auth-pass"].length === 0) {
            setAuthError({
                status: true,
                message: 'Het lijkt erop dat u geen wachtwoord ingevuld hebt.',
            });
            document.body.style.cursor = 'auto';

            return;
        };

        const user = await loginUserWithApi(loginForm['auth-username'], loginForm['auth-pass']);

        // Check if user exists
        if (!user || !user.token) {
            setAuthError({
                status: true,
                message: 'Het lijkt erop dat dit account niet bestaat.'
            });
            document.body.style.cursor = 'auto';

            return;
        };

        document.body.style.cursor = 'auto';
        setSucces(true);
        refreshService();
        setTimeout(() => {
            history.push('/profile');
            window.location.reload();
        }, 5000);
    };

    const registerUser = async () => {
        document.body.style.cursor = 'wait';

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
        <div className="popup d-lg-flex d-none">
            <span className="invisible-clickable" onClick={action}></span>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-10">
                        <div className="popup__auth">
                            {
                                type ? (
                                    <div className="popup__auth--form">
                                        {
                                            succes ? (
                                                <div className="succes-holder">
                                                    <h1>Aanmelden succesvol!</h1>
                                                    <div className="succes-holder__icon">
                                                        <img src={Check} alt="check" />
                                                    </div>
                                                </div>                                            
                                            ) : (
                                                <div className="forms-holder">
                                                    <div className="form-container">
                                                        <h1 className="only-title">Aanmelden</h1>
                                                        {
                                                            authError.status ? 
                                                                <AuthError 
                                                                    text={authError.message}
                                                                /> 
                                                                : ''
                                                        }
                                                        <InputText 
                                                            label="Jouw gebruikersnaam"
                                                            id="auth-username"
                                                            action={(e) => changeForms('login', e)}
                                                        />
                                                        <InputPass 
                                                            label="Jouw wachtwoord"
                                                            id="auth-pass"
                                                            action={(e) => changeForms('login', e)}
                                                        />
                                                        <span onClick={() => history.push('/forgotten-password')}>Wachtwoord vergeten?</span>
                                                        <div className="popup__auth--form__button">
                                                            <SlideButton
                                                                id="auth-slide"
                                                                icon={Lock}
                                                                text="Aanmelden" 
                                                                action={loginUser}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="popup__auth--form">
                                        {
                                            succes ? (
                                                <div className="succes-holder">
                                                    <h1>Registratie succesvol!</h1>
                                                </div>
                                            ) : (
                                                <div className="forms-holder">
                                                    <h1 className="only-title">Registratie</h1>
                                                    <div className="form-container">
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
                                                            action={(e) => changeForms('register', e)}
                                                        />
                                                        <InputText 
                                                            label="Jouw gebruikersnaam"
                                                            id="auth-username"
                                                            action={(e) => changeForms('register', e)}
                                                        />
                                                        <div className="popup__auth--form__button">
                                                            <SlideButton
                                                                id="auth-slide"
                                                                icon={Next}
                                                                text="Volgende stap" 
                                                                action={() => nextStep(0, 1, 'account')}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-container hidden-form">
                                                        {
                                                            authError.status ? 
                                                                <AuthError 
                                                                    text={authError.message}
                                                                /> 
                                                                : ''
                                                        }
                                                        <InputText 
                                                            label="Uw voornaam"
                                                            id="auth-firstName"
                                                            action={(e) => changeForms('register', e)}
                                                        />
                                                        <InputText 
                                                            label="Uw achternaam"
                                                            id="auth-lastName"
                                                            action={(e) => changeForms('register', e)}
                                                        />
                                                        <div className="popup__auth--form__button">
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
                                                        <p className="popup__auth--form--text">Kies een sterk en goed te onthouden wachtwoord.<br/><strong>Let op! Maak gebruik van minimaal 8 karakters.</strong></p>
                                                        {
                                                            authError.status ? 
                                                                <AuthError 
                                                                    text={authError.message}
                                                                /> 
                                                                : ''
                                                        }
                                                        <InputPass 
                                                            label="Uw wachtwoord"
                                                            id="auth-password"
                                                            action={(e) => changeForms('register', e)}
                                                        />
                                                        <InputPass 
                                                            label="Herhaal uw wachtwoord"
                                                            id="auth-passwordRepeat"
                                                            action={(e) => changeForms('register', e)}
                                                        />
                                                        <div className="popup__auth--form__button">
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
                                )
                            }
                            {
                                type ? (
                                    <div className="popup__auth--animate login">
                                        <span>
                                            <div className="popup__auth--animate--logo">
                                                <img src={Logo} alt="logo" />
                                            </div>
                                            <h5>Welkom terug!</h5>
                                            <p>Wij zijn blij jou terug te zien, via deze weg kan je je persoonlijk profiel openen.</p>
                                        </span>
                                        <div className="popup__auth--animate--change">
                                            Heb je nog geen account? <strong onClick={() => setType(false)}>Registreer je hier!</strong>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="popup__auth--animate register">
                                        <span>
                                            <div className="popup__auth--animate--logo">
                                                <img src={Screen} alt="screen" />
                                            </div>
                                            <h5>Solliciteer eenvoudig en snel</h5>
                                            <p>Gedaan met telkens het handmatig toevoegen van jouw volledig cv.</p>
                                        </span>
                                        <div className="popup__auth--animate--change">
                                            Heb je al een account? <strong onClick={() => setType(true)}>Meld je dan hier aan.</strong>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthPopUp;