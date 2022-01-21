import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { AuthError, InputPass, InputText, SlideButton } from '../../components';

import { Layout } from '../../layouts';

import Lock from '../../assets/icons/lock.svg';
import Check from '../../assets/icons/check.svg';

import { useAPI } from '../../services';

import './_Authentication.scss';

const Login = () => {
    document.title = 'Aanmelden';
    document.querySelector('meta[name="description"]').setAttribute("content", "Heb je al een account? Meld je dan hier aan.");

    const history = useHistory();

    const [ succes, setSucces ] = useState(false);
    const [ authError, setAuthError ] = useState({
        'status': false,
        'message': '',
    });
    const [ loginForm, setLoginForm ] = useState({
        'auth-username': '',
        'auth-pass': '',
    });

    const { loginUserWithApi, currentUser, refreshService } = useAPI();

    useEffect(() => {
        if (currentUser) {
            history.push('/profile');
        };
    }, [currentUser, history]);

    const changeForms = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.id]: e.target.value,
        });
    }; 

    const loginUser = async () => {
        // Check if e-mail or password has been filled in
        if (loginForm["auth-username"].length === 0) {
            setAuthError({
                status: true,
                message: 'Het lijkt erop dat u geen gebruikersnaam ingevuld hebt.'
            });

            return;
        };

        if (loginForm["auth-pass"].length === 0) {
            setAuthError({
                status: true,
                message: 'Het lijkt erop dat u geen wachtwoord ingevuld hebt.',
            });

            return;
        };

        const user = await loginUserWithApi(loginForm['auth-username'], loginForm['auth-pass']);

        // Check if user exists
        if (!user || !user.token) {
            setAuthError({
                status: true,
                message: 'Het lijkt erop dat dit account niet bestaat.'
            });

            return;
        };

        setSucces(true);
        refreshService();

        setTimeout(() => {
            history.push('/profile');
        }, 5000);
    };

    return (
        <Layout>
            <section className="authentication login">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            {
                                succes ? (
                                    <div className="succes-holder">
                                        <h1>Aanmelden succesvol!</h1>
                                        <p>Uw wordt zodadelijk omgeleid naar uw persoonlijke pagina. Even geduld.</p>
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
                                                    action={(e) => changeForms(e)}
                                                />
                                                <InputPass 
                                                    label="Jouw wachtwoord"
                                                    id="auth-pass"
                                                    action={(e) => changeForms(e)}
                                                />
                                                <div className="d-flex justify-content-between">
                                                    <NavLink to="/forgotten-password">Wachtwoord vergeten?</NavLink>
                                                    <NavLink to="/register">Registreren</NavLink>
                                                </div>
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
                    </div>
                </div>
            </section>
        </Layout>
    )
};

export default Login;