import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../components';

import './_Layout.scss';

const useForceUpdate = () => useState()[1];

export const Layout = ({children}) => {
    const forceUpdate = useForceUpdate();

    window.addEventListener("orientationchange", () => {
        forceUpdate();
    });

    const getCurrentPage = () => {
        const path = window.location.pathname;
        if (path === '/') return 'home';
        if (path === '/firms') return 'home';
        if (path === '/roadmap/firm') return 'roadmap/firm';
        if (path === '/roadmap/audience') return 'roadmap/audience';
        if (path === '/vacancies') return 'vacancies';
        if (path === '/contact') return 'contact';
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="app">
            <Header selectedTab={getCurrentPage()} />
            <div className="app-content">
                {children}
            </div>
            <Footer />
        </div>
    );
};