import React from 'react';

import Heart from '../../../assets/heart.png';

import './_Head.scss';

import headImage from '../../../assets/photos/header.jpg'

const Head = () => {
    return (
        <section className="home-entry">
            <div className="container d-md-flex d-none">
                <div className="head" >
                    <div className="head__overlay" style={{backgroundImage: `url('${headImage}')`}}>
                        <div className="head__overlay--text">
                            <h1>Hart werk <img src={Heart} alt="heart"/></h1>
                            <p>Voor een aantrekkelijke job in een gezonde omgeving, <br/>creëert Enjoy Jobs het snelst sterke relaties tussen werkgever <br/>en werkzoekende.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-md-none d-flex">
                <div className="head head-mobile">
                    <div className="head__overlay" style={{backgroundImage: `url('${headImage}')`}}>
                        <div className="head__overlay--text">
                            <h1>Hart werk <img src={Heart} alt="heart"/></h1>
                            <p>Voor een aantrekkelijke job in een gezonde omgeving, <br/>creëert Enjoy Jobs het snelst sterke relaties tussen werkgever <br/>en werkzoekende.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Head;