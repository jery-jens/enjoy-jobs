import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useHistory, useLocation } from 'react-router-dom';

import { InputText, InputTextArea, BasicButton } from '../../components';
import { useToolbox, useAPI } from '../../services';
import { Layout } from '../../layouts';
import { clientConfig } from '../../config';

import './Contact.scss';

import Phone from '../../assets/icons/phone.svg';
import House from '../../assets/icons/home.svg';
import Mail from '../../assets/icons/mail.svg';
import EnjoyJobs from '../../assets/icons/logo.svg';
import Parking from '../../assets/icons/parking.svg';

const Contact = () => {
    document.title = 'Contact';
    document.querySelector('meta[name="description"]').setAttribute("content", "Contacteer ons als je graag persoonlijk in gesprek wil gaan.");

    const history = useHistory();
    const location = useLocation();
    const locationStates = location.state;

    const { sendContact } = useAPI();
    const { getCSSSizeModifier } = useToolbox();

    const [ error, setError ] = useState();
    const [ confirm, setConfirm ] = useState();
    const [ isPersoonlijkheidstest, setIsPersoonlijksheidsTest ] = useState(false);

    useEffect(() => {
        if (locationStates) {
            setIsPersoonlijksheidsTest(true);
        };
    }, [locationStates]);

    const Map = ReactMapboxGl({accessToken: clientConfig.mapboxToken});

    const sendEmail = async () => {
        const name = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('telephone').value;
        const subject = 'Contact via contactformulier';
        const body = document.getElementById('message').value;

        // const mobileRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        // if (mobileRegEx.exec(mobile)) setError('Onjuist telefoonnummer formaat')

        if (name && email && mobile && subject && body) {
            setError()
            setConfirm('Bericht wordt verstuurd...');
            const contact = await sendContact(name, email, mobile, subject, body);
            if (contact.errors && contact.errors.email) {
                setError(contact.errors.email[0])
            } else {
                // setConfirm('Bericht is verzonden!');
                history.push(
                    '/contact-succes', 
                    {
                        telephone: mobile,
                        email,
                    }
                )
            }
        } else {
            setError('Gelieve alle vereiste velden in te vullen.')
        }
    }

    return (
        <Layout>
            <div className={`contact ${getCSSSizeModifier('contact')} container`}>
                <h1>{(isPersoonlijkheidstest) ? 'Contacteer ons voor een persoonlijkheidstest' : 'Contacteer ons'}</h1>
                <div className="contact__options col-12 col-lg-6">
                    <span>
                        <a href="tel:+32056980051">
                            <img src={Phone} alt="phone" />
                            +32 (0) 56 980  051
                        </a>
                    </span>
                    <span>
                    <a href="mailto:info@enjoy.jobs">
                        <img src={Mail} alt="mail" />
                        info@enjoy.jobs
                    </a>
                    </span>
                    <span>
                    <p href="location">
                        <img src={House} alt="house" />
                        Meensesteenweg 298, 8501 Kortrijk
                    </p>
                    </span>
                </div>
                <div className="contact__map d-lg-none col-12">
                    <Map
                        // eslint-disable-next-line
                        style={"mapbox://styles/feelindev/ckfp5t04d0row19pfdckf8lus"} 
                        containerStyle={{
                            height: '100%',
                            width: '100%'
                        }}
                        center={[3.228990, 50.822350]}
                        zoom={[15]}
                    >
                        <Marker
                            coordinates={[3.228990, 50.822350]}
                            anchor="bottom"
                        >
                            <img src={Parking} alt="logo" style={{width: '30px'}}/>
                        </Marker>
                        <Marker
                            coordinates={[3.228540, 50.824219]}
                            anchor="bottom"
                        >
                            <img src={EnjoyJobs} alt="parking" style={{width: '30px'}}/>
                        </Marker>
                    </Map>
                </div>
                <div className="contact__form col-12 col-lg-6">
                    <h2 className="d-lg-none">Stuur ons een bericht</h2>
                    <div className="col-lg-6">
                        <InputText
                            label="Voornaam *"
                            id="firstName"
                            borderColor="blue"
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <InputText
                            label="Achternaam *"
                            id="lastName"
                            borderColor="blue"
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <InputText
                            label="E-mail *"
                            id="email"
                            borderColor="blue"
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <InputText
                            label="Telefoon *"
                            id="telephone"
                            borderColor="blue"
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <InputText
                            label="Jouw linkedin-link"
                            id="linkedin"
                            borderColor="blue"
                        />
                    </div>
                    <div className="col-12">
                        <InputTextArea
                            label="Typ hier jouw bericht *"
                            id="message"
                            height="215px"
                            borderColor="blue"
                            value={
                                (isPersoonlijkheidstest) 
                                    ? 'Dag Sophie, dag Fien, \n\nIk had graag meer info ontvangen over de persoonlijkheidstest.\n\nGelieve mij te contacteren.\n\nVriendelijke groeten,'
                                    : null
                            }
                        />
                    </div>
                    <div className="col-12">
                        <BasicButton
                            
                            value="Verstuur bericht"
                            id="submit"
                            onClick={sendEmail}
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
                </div>
                <div className="contact__map d-none d-lg-block col-12">
                    <Map
                        // eslint-disable-next-line
                        style={"mapbox://styles/feelindev/ckfp5t04d0row19pfdckf8lus"} 
                        containerStyle={{
                            height: '100%',
                            width: '100%'
                        }}
                        center={[3.228990, 50.822350]}
                        zoom={[15]}
                    >
                        <Marker
                            coordinates={[3.228990, 50.822350]}
                            anchor="bottom"
                        >
                            <img src={Parking} alt="logo" style={{width: '30px'}}/>
                        </Marker>
                        <Marker
                            coordinates={[3.228540, 50.824219]}
                            anchor="bottom"
                        >
                            <img src={EnjoyJobs} alt="parking" style={{width: '30px'}}/>
                        </Marker>
                    </Map>
                </div>
            </div>
        </Layout>
    )
};

export default Contact;