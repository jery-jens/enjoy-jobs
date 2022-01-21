import React from 'react';

import './_Footer.scss';
import logoImg from '../../assets/logo.png';
import fb from '../../assets/icons/fb.svg';
import linkedin from '../../assets/icons/linkedin.svg';
import twitter from '../../assets/icons/twitter.svg';
import instagram from '../../assets/icons/insta.svg';

export const Footer = () => {
    return (
        <footer className="footer container" >
            <div className="footer__body bg-tertiary d-md-flex d-none">
                <div className="col-4 col-xl-2">
                    <img src={logoImg} alt="Enjoy Jobs logo"/> 
                    <a className="a--no-css" href="/contact">Meensesteenweg 298, 8501 Kortrijk</a>
                    <a className="a--no-css" href="/contact">+32 (0) 56 980 051</a>
                    <a className="a--no-css" href="mailto:enjoyjobs@enjoy.jobs">info@enjoy.jobs</a>
                    <div className="socials">
                    <a href="https://www.facebook.com/enjoyhartwerk/"><img alt="fb" src={fb}/></a>
                    <a href="https://www.instagram.com/enjoy__jobs/"><img alt="insta" src={instagram}/></a>
                    <a href="https://twitter.com/enjoy_jobs/"><img alt="twitter" src={twitter}/></a>
                    <a href="https://www.linkedin.com/company/enjoy-jobs/"><img alt="linkedin" src={linkedin}/></a>
                    </div>
                </div>
                <div className="col-4 col-xl-2">
                    <h1>Ontdek</h1>
                    <a href="/">Startpagina</a>
                    <a href="/vacancies">Vacatures</a>
                    <a href="/contact">Contact</a>
                    <a href="/login">Aanmelden</a>
                    <a href="/register">Registreren</a>
                </div>
                <div className="col-4 col-xl-2">
                    <h1>Belangrijk</h1>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/requirements">Algemene voorwaarden</a>
                    <a href="/disclaimer">Disclaimer</a>
                </div>
            </div>

            <div className="footer__publishers d-md-flex d-none">
                <p>© Enjoy Jobs - 2021</p>
                <p>A collaboration by Orbit DevStudio & feelindev</p>
            </div>

            <div className="footer__body--sm bg-tertiary d-flex d-md-none">
                <div className="socials">
                    <a href="https://www.facebook.com/enjoyhartwerk/"><img alt="fb" src={fb}/></a>
                    <a href="https://www.instagram.com/enjoy__jobs/"><img alt="insta" src={instagram}/></a>
                    <a href="https://twitter.com/enjoy_jobs/"><img alt="twitter" src={twitter}/></a>
                    <a href="https://www.linkedin.com/company/enjoy-jobs/"><img alt="linkedin" src={linkedin}/></a>
                </div>
                <div>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/requirements">Algemene voorwaarden</a>
                    <a href="/disclaimer">Disclaimer</a>
                </div>
                <div className="footer__publishers">
                    <p>© Enjoy Jobs - 2021</p>
                </div>
            </div>
        </footer>
    )
};