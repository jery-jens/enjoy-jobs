import React, { useCallback, useEffect, useState } from 'react';

import { Layout } from '../../layouts';
import { useAPI } from '../../services';
import { Roadmap, References } from './components';

const Steps = () => {
    const { getCompanyReviews } = useAPI();
    
    const [ references, setReferences ] = useState();

    document.title = 'Onze aanpak | klanten';
    document.querySelector('meta[name="description"]').setAttribute("content", "Zo pakken wij het aan...");

    const getReferences = useCallback(async () => {
        const res = await getCompanyReviews();
        setReferences(res);
    }, [getCompanyReviews]);

    useEffect(() => {
        getReferences();
    }, [getReferences]);

    return (
        <Layout>
            <Roadmap target="firm" />
            <References target="firm" references={references} />
        </Layout>
    )
};

export default Steps;