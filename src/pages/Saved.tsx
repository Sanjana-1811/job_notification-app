import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/jobs';
import type { Job } from '../data/jobs';
import JobCard from '../components/Job/JobCard';
import JobModal from '../components/Job/JobModal';

const Saved: React.FC = () => {
    const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            try {
                setSavedJobIds(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved jobs', e);
            }
        }
    }, []);

    const handleSaveToggle = (jobId: string) => {
        setSavedJobIds(prev => {
            let newSaved: string[];
            if (prev.includes(jobId)) {
                newSaved = prev.filter(id => id !== jobId);
            } else {
                newSaved = [...prev, jobId];
            }
            localStorage.setItem('savedJobs', JSON.stringify(newSaved));
            return newSaved;
        });
    };

    const savedJobsList = jobsData.filter(job => savedJobIds.includes(job.id));

    return (
        <div style={{ paddingBottom: 'var(--space-5)' }}>
            <h1 className="placeholder-title" style={{ marginTop: 'var(--space-2)' }}>Saved Jobs</h1>

            {savedJobsList.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {savedJobsList.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={true}
                            onSaveToggle={handleSaveToggle}
                            onViewDetails={setSelectedJob}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state" style={{ marginTop: 'var(--space-3)' }}>
                    <h2 className="empty-state__title">No saved jobs</h2>
                    <p className="empty-state__body">
                        Jobs you explicitly save from your dashboard or digest will appear here. You haven't saved any yet.
                    </p>
                </div>
            )}

            <JobModal
                job={selectedJob}
                isOpen={!!selectedJob}
                onClose={() => setSelectedJob(null)}
                isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
                onSaveToggle={handleSaveToggle}
            />
        </div>
    );
};

export default Saved;
