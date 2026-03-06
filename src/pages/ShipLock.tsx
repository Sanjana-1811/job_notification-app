import React from 'react';
import { useTestState } from '../hooks/useTestState';

const ShipLock: React.FC = () => {
    const { isShipReady, passedCount } = useTestState();

    if (isShipReady) {
        return (
            <div className="placeholder-page" style={{ paddingTop: 'var(--space-5)' }}>
                <h1 className="placeholder-title" style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    🚀 Ready to Ship
                </h1>

                <div className="empty-state" style={{ marginTop: 'var(--space-3)' }}>
                    <h2 className="empty-state__title">All criteria met</h2>
                    <p className="empty-state__body">
                        Congratulations! You have verified all 10 core tracking and design systems.
                        Job Notification Tracker is ready for production.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="placeholder-page" style={{ paddingTop: 'var(--space-5)' }}>
            <h1 className="placeholder-title" style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                🔒 Production Locked
            </h1>

            <div className="empty-state" style={{ marginTop: 'var(--space-3)' }}>
                <h2 className="empty-state__title">Complete all tests before shipping.</h2>
                <p className="empty-state__body">
                    You have passed {passedCount} / 10 required diagnostic checks.
                    Please return to the test checklist and verify all systems.
                </p>
            </div>
        </div>
    );
};

export default ShipLock;
