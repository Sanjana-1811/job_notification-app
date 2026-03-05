import React from 'react';

const Digest: React.FC = () => {
    return (
        <div className="placeholder-page">
            <h1 className="placeholder-title">Digest</h1>

            <div className="empty-state" style={{ marginTop: 'var(--space-3)' }}>
                <h2 className="empty-state__title">Your inbox is empty</h2>
                <p className="empty-state__body">
                    This feature will compile your top daily matched jobs into a clean, skimmable format delivered every morning.
                </p>
            </div>
        </div>
    );
};

export default Digest;
