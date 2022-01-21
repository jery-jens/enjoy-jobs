import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAPI, useToolbox } from '../../services';
import { AuthPopUp } from '../Popup';
import { HamburgerMenu } from '../Hamburger';

import Logo from '../../assets/logo.png';
import User from '../../assets/user.png';

import './_header.scss';

const Header = ({selectedTab}) => {
    const { setTarget, target } = useToolbox();
    const { currentUser } = useAPI();

    const [ menuDisplay, setMenuDisplay ] = useState(false);
    const [ authDisplay, setAuthDisplay ] = useState(false);

    const changeTarget = async (type) => {
        await setTarget(type);
        window.location.reload();
    };

    const showMenu = () => {
        const button = document.getElementsByClassName('header__mobile--menu');
        const dots = button[0].children;

        for (let i = 0; i < dots.length; i++) {
            (function(ind) {
                setTimeout(function(){
                    dots[i].classList.add('dot-away');

                    if (i === 3) {
                        setTimeout(() => {
                            setMenuDisplay(true);
                            setTimeout(() => {
                                const hamburger = document.getElementsByClassName('hamburger-menu')[0];
                                hamburger.classList.add('show-hamburger');
                            }, 100);
                        }, 400)
                    }
                }, 0 + (100 * ind));
            })(i);
        };
    };

    const hideMenu = () => {
        const button = document.getElementsByClassName('header__mobile--menu');
        const dots = button[0].children;
        const hamburger = document.getElementsByClassName('hamburger-menu')[0];

        hamburger.classList.remove('show-hamburger');

        setTimeout(() => {
            setMenuDisplay(false);
            for (let i = 0; i < dots.length; i++) {
                (function(ind) {
                    setTimeout(function(){
                        dots[i].classList.remove('dot-away');
                    }, 0 + (100 * ind));
                })(i);
            };
        }, 1500);
    };

    const showAuth = () => {
        setAuthDisplay(true);
    };

    const hideAuth = () => {
        setAuthDisplay(false);
    };

    return (
        <header className="header">
            <div className="container">
            <div className="row d-lg-flex d-none">
                <div className="col-12">
                    <div className="header__switch">
                        {
                            target !== 'audience' ? (
                                <div onClick={() => changeTarget('audience')}>Een job voor jou</div>
                            ) : (
                                <div className="header__switch--active">Een job voor jou</div>
                            )
                        }
                        <span className="header__switch--border"></span>
                        {
                            target === 'firm' ? (
                                <div className="header__switch--active">Voor bedrijven</div>
                            ) : (
                                <div onClick={() => changeTarget('firm')}>Voor bedrijven</div>
                            )
                        }                        
                    </div>
                    <div className="header__underline"></div>
                </div>
            </div>
            <div className="row d-lg-flex d-none">
                <div className="col-12 header__nav">
                    <div className="header__nav--logo">
                        <NavLink to="/">
                            <img src={Logo} alt="logo" />
                        </NavLink>
                    </div>
                    <nav className="header__nav--navigation">
                        <ul>
                            <li><NavLink to="/" id={(selectedTab === 'home') ? 'nav-colored' : ''}>Startpagina</NavLink></li>
                            <li><NavLink to={`/roadmap/${target === "audience" ? "audience" : "firm"}`} id={(selectedTab === 'roadmap/firm') ? 'nav-colored' : (selectedTab === 'roadmap/audience') ? 'nav-colored' : ''}>Onze aanpak</NavLink></li>
                            <li><NavLink to="/vacancies" id={(selectedTab === 'vacancies') ? 'nav-colored' : ''}>Vacatures</NavLink></li>
                            <li><NavLink to="/contact" id={(selectedTab === 'contact') ? 'nav-colored' : ''}>Contact</NavLink></li>
                        </ul>
                        {
                            currentUser ? (
                                <NavLink to="/profile">
                                    <span>
                                        <p>mijn profiel</p>
                                        <img src={User} alt="user"/>
                                    </span>
                                </NavLink>
                            ) : (
                                <span onClick={showAuth}>
                                    <p>aanmelden</p>
                                    <img src={User} alt="user"/>
                                </span>
                            )
                        }
                    </nav>
                </div>
            </div>
            <div className="row d-flex d-lg-none">
                <div className="col-12 header__mobile">
                    <NavLink to="/">
                        <img src={Logo} alt="logo" />
                    </NavLink>
                    <div className="header__mobile--menu" onClick={showMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            {
                authDisplay ? (
                    <AuthPopUp 
                        action={hideAuth}
                    />
                ) : ''
            }

            {
                menuDisplay ? (
                    <HamburgerMenu
                        changeTarget={changeTarget}
                        target={target}
                        hideMenu={hideMenu}
                    />
                ) : ''
            }
            </div>
        </header>
    )
};

export default Header;