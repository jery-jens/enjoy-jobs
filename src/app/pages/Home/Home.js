import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useToolbox } from '../../services'
import { Layout } from '../../layouts';
import { About, BlogsSection, Contact, Head, SearchEngine, Team, WhyFullSubjects, WhySubjects } from './components';

const Home = () => {
    const { target } = useToolbox();
    const history = useHistory();
    document.title = 'Enjoy Jobs | Startpagina';

    useEffect(() => {
        if (target === "firm") {
            history.push('/firms');
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

export default Home;