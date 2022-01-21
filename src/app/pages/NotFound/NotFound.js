import React from 'react';

import { useToolbox } from '../../services';
import { Layout } from '../../layouts';

import './NotFound.scss';

const NotFound = () => {
    document.title = 'Enjoy Jobs';

    const { getCSSSizeModifier } = useToolbox();
    return (
        <Layout>
            <div className="not-found container">
                <div className={`not-found__content ${getCSSSizeModifier('not-found__content')}`}>
                    <p className="not-found-content__404">404</p>
                    <div className="not-found-content__text">
                        <h1>Oeps! Dit kan toch niet kloppen?</h1>
                        <p>Laat ons je helpen met enkele nuttige links:</p>
                        <div>
                            <a href="/home">Startpagina</a>
                            <a href="/vacancies">Vacatures</a>
                            <a href="/contact">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default NotFound;