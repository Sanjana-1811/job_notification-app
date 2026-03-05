import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="placeholder-page">
            <h1 className="placeholder-title">Dashboard</h1>

            <div className="empty-state" style={{ marginTop: 'var(--space-3)' }}>
                <h2 className="empty-state__title">No jobs yet.</h2>
                <p className="empty-state__body">
                    In the next step, you will load a realistic dataset.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
