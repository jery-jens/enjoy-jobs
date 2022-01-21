import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useToolbox } from '../../services'
import { Layout } from '../../layouts';
import { About, BlogsSection, Contact, Head, SearchEngine, Team, WhyFullSubjects, WhySubjects } from './components';

const HomeFirm = () => {
    const { target } = useToolbox();
    const history = useHistory();
    document.title = 'Enjoy Jobs | Startpagina';

    useEffect(() => {
        if (target === "audience") {
            history.push('/');
        };
    }, [history, target]);

    return (
        <Layout>
            <Head />
            { target === 'audience' ? <SearchEngine /> : <WhySubjects />}
            <About />
            { target !== 'audience' && <WhyFullSubjects />}
            <Team />
            <BlogsSection title="Neus rond door onze blogs" />
            <Contact />
        </Layout>
    );
};

export default HomeFirm;