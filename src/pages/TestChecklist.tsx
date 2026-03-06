import React from 'react';
import { useTestState } from '../hooks/useTestState';
import type { TestState } from '../hooks/useTestState';

const CHECKLIST_ITEMS: { id: keyof TestState; label: string; tooltip: string }[] = [
    { id: 'prefsPersist', label: 'Preferences persist after refresh', tooltip: 'Set preferences -> Refresh -> Data must remain' },
    { id: 'scoreCalculates', label: 'Match score calculates correctly', tooltip: 'Test score components based on exact requirements' },
    { id: 'showMatchesWorks', label: '"Show only matches" toggle works', tooltip: 'Must filter out any score < threshold completely' },
    { id: 'savePersists', label: 'Save job persists after refresh', tooltip: 'Star a job -> Refresh -> Stay starred (localStorage)' },
    { id: 'applyOpensTab', label: 'Apply opens in new tab', tooltip: 'Verify target="_blank" and rel="noopener noreferrer"' },
    { id: 'statusPersists', label: 'Status update persists after refresh', tooltip: 'Switch to Applied -> Refresh -> Badge stays Applied' },
    { id: 'statusFilterWorks', label: 'Status filter works correctly', tooltip: 'Filter must AND stack with all other dashboard states' },
    { id: 'digestGenerates10', label: 'Digest generates top 10 by score', tooltip: 'Must restrict to 10 array slots strictly ascending' },
    { id: 'digestPersists', label: 'Digest persists for the day', tooltip: 'Generate digest -> Refresh -> No reload required' },
    { id: 'noConsoleErrors', label: 'No console errors on main pages', tooltip: 'Verify no warnings/errors on Dash, Sett, Dig, Saved' }
];

const TestChecklist: React.FC = () => {
    const { tests, toggleTest, resetTests, passedCount, isShipReady } = useTestState();

    return (
        <div style={{ paddingBottom: 'var(--space-5)', maxWidth: '720px', margin: '0 auto', width: '100%' }}>

            <div style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h1 className="placeholder-title" style={{ margin: 0 }}>Diagnostic Checklist</h1>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: isShipReady ? 'rgba(47, 107, 79, 0.1)' : 'rgba(17, 17, 17, 0.05)',
                    border: `1px solid ${isShipReady ? 'var(--color-success)' : 'rgba(17, 17, 17, 0.1)'}`,
                    padding: '16px 24px',
                    borderRadius: '8px',
                    color: isShipReady ? 'var(--color-success)' : 'var(--color-text)'
                }}>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
                        Tests Passed: {passedCount} / 10
                    </h2>
                    {!isShipReady && (
                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-accent)' }}>
                            Resolve all issues before shipping.
                        </div>
                    )}
                </div>
            </div>

            <div className="card card--workspace" style={{ padding: '0', overflow: 'hidden' }}>
                {CHECKLIST_ITEMS.map((item, index) => (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px 24px',
                            borderBottom: index !== CHECKLIST_ITEMS.length - 1 ? '1px solid rgba(17,17,17,0.05)' : 'none',
                            background: tests[item.id] ? 'rgba(47, 107, 79, 0.02)' : 'transparent',
                            transition: 'background 0.2s ease'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={tests[item.id]}
                            onChange={() => toggleTest(item.id)}
                            style={{
                                width: '20px',
                                height: '20px',
                                accentColor: 'var(--color-success)',
                                cursor: 'pointer',
                                flexShrink: 0
                            }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 500,
                                textDecoration: tests[item.id] ? 'line-through' : 'none',
                                color: tests[item.id] ? 'rgba(17,17,17,0.5)' : 'var(--color-text)'
                            }}>
                                {item.label}
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(17,17,17,0.5)' }}>
                                How to test: {item.tooltip}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className="button button--secondary"
                    onClick={resetTests}
                    style={{ fontSize: '14px' }}
                >
                    Reset Test Status
                </button>
            </div>
        </div>
    );
};

export default TestChecklist;
