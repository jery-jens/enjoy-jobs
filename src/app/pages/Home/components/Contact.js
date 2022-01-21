import React from 'react';
import { NavLink } from 'react-router-dom';

import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { clientConfig } from '../../../config';

import './_Contact.scss';

import Phone from '../../../assets/icons/phone.svg';
import House from '../../../assets/icons/home.svg';
import EnjoyJobs from '../../../assets/icons/logo.svg';
import Parking from '../../../assets/icons/parking.svg';

const Contact = () => {
    const Map = ReactMapboxGl({accessToken: clientConfig.mapboxToken});

    return (
        <section className="contact">
            <div className="contact__info container">
                <div className="row d-flex">
                    <div className="col-lg-6 col-12">
                        <h1 className="contact__info--title">Nog vragen?</h1>
                        <div className="contact__info--reaches">
                            <span>
                                <h5>Bereik ons telefonisch</h5>
                                <a href="tel:+32056980051">
                                    <img src={Phone} alt="phone" />
                                    +32 (0) 56 980  051
                                </a>
                            </span>
                            <span>
                                <h5>Of kom langs</h5>
                                <p>
                                    <img src={House} alt="house" />
                                    Meensesteenweg 298, 8501 Kortrijk
                                </p>
                            </span>
                        </div>
                        <div className="contact__info--button">
                            <a href="mailto:info@enjoy.jobs" className="contact__info--button--mail">
                                Stuur ons een e-mail
                            </a>
                            <NavLink className="contact__info--button--action" to="/contact">
                                Of laat een bericht na
                            </NavLink>
                        </div>
                    </div>
                    <div className="contact__map right-sided-map d-none d-lg-flex">
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
                                <img src={Parking} alt="marker" style={{width: '30px'}}/>
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
            </div>
            <div className="contact__map responsive-map d-flex d-lg-none">
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
        </section>
    )
};

export default Contact;