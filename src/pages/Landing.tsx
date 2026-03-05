import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="placeholder-page" style={{ alignItems: 'center', textAlign: 'center' }}>
            <h1 className="placeholder-title" style={{ fontSize: '3rem', marginBottom: 'var(--space-2)' }}>
                Stop Missing The Right Jobs.
            </h1>
            <p className="placeholder-subtitle" style={{ marginBottom: 'var(--space-4)', fontSize: '1.25rem' }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>
            <button
                className="button button--primary"
                style={{ fontSize: '1.125rem', padding: '0 var(--space-4)', height: '48px' }}
                onClick={() => navigate('/settings')}
            >
                Start Tracking
            </button>
        </div>
    );
};

export default Landing;
