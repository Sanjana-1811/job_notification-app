import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

export type JobStatusType = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export interface JobStatusRecord {
    status: JobStatusType;
    dateChanged: string; // ISO string
}

export const useJobStatus = () => {
    const [statuses, setStatuses] = useState<Record<string, JobStatusRecord>>({});
    const { addToast } = useToast();

    useEffect(() => {
        const loadStatuses = () => {
            const stored = localStorage.getItem('jobTrackerStatus');
            if (stored) {
                try {
                    // Parse and validate, defaulting to empty object if corrupt
                    const parsed = JSON.parse(stored);
                    if (typeof parsed === 'object' && parsed !== null) {
                        setStatuses(parsed);
                        return;
                    }
                } catch (e) {
                    console.error('Failed to parse job statuses', e);
                }
            }
            setStatuses({}); // Safe default
        };

        loadStatuses();

        // Optional: listen for storage events to sync across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'jobTrackerStatus') {
                loadStatuses();
            }
        });
    }, []);

    const getJobStatus = useCallback((jobId: string): JobStatusType => {
        return statuses[jobId]?.status || 'Not Applied';
    }, [statuses]);

    const updateJobStatus = useCallback((jobId: string, newStatus: JobStatusType) => {
        setStatuses(prev => {
            // If changing back to default, we could remove the key to save space, but keeping it is fine for tracking
            const newRecord: JobStatusRecord = {
                status: newStatus,
                dateChanged: new Date().toISOString()
            };

            const newStatuses = {
                ...prev,
                [jobId]: newRecord
            };

            localStorage.setItem('jobTrackerStatus', JSON.stringify(newStatuses));
            return newStatuses;
        });

        if (newStatus !== 'Not Applied') {
            addToast(`Status updated: ${newStatus}`);
        }
    }, [addToast]);

    return {
        statuses,
        getJobStatus,
        updateJobStatus
    };
};
