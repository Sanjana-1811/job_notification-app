import React from 'react';

const Saved: React.FC = () => {
    return (
        <div className="placeholder-page">
            <h1 className="placeholder-title">Saved</h1>

            <div className="empty-state" style={{ marginTop: 'var(--space-3)' }}>
                <h2 className="empty-state__title">No saved jobs</h2>
                <p className="empty-state__body">
                    Jobs you explicitly save from your dashboard or digest will appear here. You haven't saved any yet.
                </p>
            </div>
        </div>
    );
};

export default Saved;
