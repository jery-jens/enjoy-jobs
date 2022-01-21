import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAPI } from '../../services';


import Exit from '../../assets/icons/cross.svg';
import Logo from '../../assets/logo.png';
import User from '../../assets/user.png';
import Facebook from '../../assets/icons/fb.svg';
import Instagram from '../../assets/icons/insta.svg';
import Linkedin from '../../assets/icons/linkedin.svg';
import Twitter from '../../assets/icons/twitter.svg';

import './_HamburgerMenu.scss';

const HamburgerMenu = ({target, changeTarget, hideMenu}) => {
    const { currentUser } = useAPI();

    return (
        <div className="hamburger-menu">
            <div className="hamburger-container">
                <div className="row">
                    <div className="col-12 hamburger-menu__header">
                        <img src={Logo} alt="logo" className="hamburger-logo" />
                        <img src={Exit} alt="exit" className="hamburger-exit" onClick={hideMenu} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center hamburger-menu__switch">
                        {
                            target !== 'audience' ? (
                                <div onClick={() => changeTarget('audience')}>Een job voor u</div>
                            ) : (
                                <div className="hamburger-menu__switch--active">Een job voor u</div>
                            )
                        }
                        <span className="hamburger-menu__switch--border"></span>
                        {
                            target === 'firm' ? (
                                <div className="hamburger-menu__switch--active">Voor bedrijven</div>
                            ) : (
                                <div onClick={() => changeTarget('firm')}>Voor bedrijven</div>
                            )
                        }                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 hamburger-menu__nav">
                        <ul>
                            <li><NavLink to="/">Startpagina</NavLink></li>
                            <li><NavLink to={`/roadmap/${target}`}>Onze aanpak</NavLink></li>
                            <li><NavLink to="/vacancies">Vacatures</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="hamburger-menu__buttons">
                        {
                            !currentUser ? (
                                <NavLink to="/login">
                                    <span>
                                        <p>aanmelden</p>
                                        <img src={User} alt="user"/>
                                    </span>
                                </NavLink>
                            ) : (
                                <NavLink to="/profile">
                                    <span>
                                        <p>jouw profiel</p>
                                        <img src={User} alt="user"/>
                                    </span>
                                </NavLink>
                            )
                        }
                        <div className="hamburger-menu__buttons--socials">
                            <a href="https://www.facebook.com/enjoyhartwerk/" rel="noopener noreferrer" target="_blank">
                                <img src={Facebook} alt="facebook" />
                            </a>
                            <a href="https://www.instagram.com/enjoy__jobs/" rel="noopener noreferrer" target="_blank">
                                <img src={Instagram} alt="instagram" />
                            </a>
                            <a href="https://www.linkedin.com/company/enjoy-jobs/" rel="noopener noreferrer" target="_blank">
                                <img src={Linkedin} alt="linkedin" />
                            </a>
                            <a href="https://twitter.com/enjoy_jobs/" rel="noopener noreferrer" target="_blank">
                                <img src={Twitter} alt="twitter" />
                            </a>
                        </div>
                </div>
            </div>
        </div>
    )
};

export default HamburgerMenu;