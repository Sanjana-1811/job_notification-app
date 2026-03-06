import { useState, useEffect, useCallback } from 'react';

export interface TestState {
    prefsPersist: boolean;
    scoreCalculates: boolean;
    showMatchesWorks: boolean;
    savePersists: boolean;
    applyOpensTab: boolean;
    statusPersists: boolean;
    statusFilterWorks: boolean;
    digestGenerates10: boolean;
    digestPersists: boolean;
    noConsoleErrors: boolean;
}

const defaultState: TestState = {
    prefsPersist: false,
    scoreCalculates: false,
    showMatchesWorks: false,
    savePersists: false,
    applyOpensTab: false,
    statusPersists: false,
    statusFilterWorks: false,
    digestGenerates10: false,
    digestPersists: false,
    noConsoleErrors: false
};

export const useTestState = () => {
    const [tests, setTests] = useState<TestState>(defaultState);

    useEffect(() => {
        const loadTests = () => {
            const stored = localStorage.getItem('jobTrackerTestStatus');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (typeof parsed === 'object' && parsed !== null) {
                        setTests({ ...defaultState, ...parsed }); // Merge with default state just in case
                        return;
                    }
                } catch (e) {
                    console.error('Failed to parse test statuses', e);
                }
            }
            setTests(defaultState);
        };
        loadTests();
    }, []);

    const toggleTest = useCallback((key: keyof TestState) => {
        setTests(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            localStorage.setItem('jobTrackerTestStatus', JSON.stringify(newState));
            return newState;
        });
    }, []);

    const resetTests = useCallback(() => {
        setTests(defaultState);
        localStorage.setItem('jobTrackerTestStatus', JSON.stringify(defaultState));
    }, []);

    const passedCount = Object.values(tests).filter(Boolean).length;
    const isShipReady = passedCount === 10;

    return {
        tests,
        toggleTest,
        resetTests,
        passedCount,
        isShipReady
    };
};
