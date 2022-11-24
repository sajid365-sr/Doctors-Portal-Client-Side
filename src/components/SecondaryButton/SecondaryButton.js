
import React from 'react';

const SecondaryButton = ({children}) => {
    return (
        <button className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white">{children}</button>
    );
};

export default SecondaryButton;