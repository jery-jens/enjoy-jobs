import React from 'react';

import './_Error.scss';

const AuthError = ({text}) => {
    return (
        <div className="auth-error">
            {text}
        </div>
    )
};

export default AuthError;