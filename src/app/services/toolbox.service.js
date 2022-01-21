import React, { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';

const ToolboxContext = createContext();
const useToolbox = () => useContext(ToolboxContext);

const ToolboxProvider = ({children}) => {
    /**
     * @desc get cookie, no cookie means inserting a default one
    */
    const getTarget = () => {
        const cookies = new Cookies();

        if (!cookies.get('target')) {
            cookies.set('target', 'audience');
        };

        return cookies.get('target');
    };

    const getCSSSizeModifier = (element) => {
        if (window.innerWidth < 991.99) {
            return `${element}--mob`
        }
        
        if (window.innerWidth < 1199.99) {
            return `${element}--md`
        }
        return `${element}`
    }

    const screenIsMobile = () => {
        return window.innerWidth < 991.99;
    };

    const [ target, updateTarget ] = useState(getTarget);

    /**
     * @desc switching between target audience
     * @param {type} string
    */
    const setTarget = (type) => {
        const cookies = new Cookies();

        cookies.set('target', type);
        updateTarget(type);
    };

    return (
        <ToolboxContext.Provider value={{
            setTarget,
            target,
            updateTarget,
            screenIsMobile,
            getCSSSizeModifier,
        }}>
            {children}
        </ToolboxContext.Provider>
    )
};

export {
    ToolboxContext,
    ToolboxProvider,
    useToolbox,
};