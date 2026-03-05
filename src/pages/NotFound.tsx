import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="placeholder-page" style={{ alignItems: 'center' }}>
            <h1 className="placeholder-title">Page Not Found</h1>
            <p className="placeholder-subtitle">The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
