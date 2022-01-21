import React, { useCallback, useEffect, useState } from 'react';

import { Layout } from '../../layouts';
import { useAPI } from '../../services';
import { Roadmap, References } from './components';

const Steps = () => {
    const { getClientReviews } = useAPI();

    const [ references, setReferences ] = useState();

    document.title = 'Onze aanpak | kandidaten';
    document.querySelector('meta[name="description"]').setAttribute("content", "Zo pakken wij het aan...");

    const getReferences = useCallback(async () => {
        const res = await getClientReviews();
        setReferences(res);
    }, [getClientReviews]);

    useEffect(() => {
        getReferences();
    }, [getReferences]);

    return (
        <Layout>
            <Roadmap target="audience" />
            <References target="audience" references={references} />
        </Layout>
    )
};

export default Steps;