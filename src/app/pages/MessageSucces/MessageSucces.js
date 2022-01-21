import React from 'react';
import { useLocation } from 'react-router-dom';
 
import { Layout } from '../../layouts';
import phone from '../../assets/icons/phone.svg'
import email from '../../assets/icons/mail.svg'

import './ApplySucces.scss';

const MessageSucces = () => {
    document.title = 'Enjoy Jobs | Contact';

    const location = useLocation();

    return (
        <Layout>
            <div className="apply-succes container">
                <h1>Jouw bericht is succesvol verstuurd!</h1>
                <p>Onze hartwerkende mensen nemen zo snel mogelijk contact met u op via volgende gegevens:</p>

                <div className="apply-succes__user-info">
                    <div><img alt="phone-icon" src={phone}/> <p>{location.state.telephone}</p></div>
                    <div><img alt="email-icon" src={email}/> <p>{location.state.email}</p></div>
                </div>
                <a href="/">Terug naar de startpagina.</a>
            </div>
        </Layout>
    )
};

export default MessageSucces;