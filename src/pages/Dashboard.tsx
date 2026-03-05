import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/jobs';
import type { Job } from '../data/jobs';
import JobCard from '../components/Job/JobCard';
import JobModal from '../components/Job/JobModal';
import FilterBar from '../components/Job/FilterBar';
import type { FilterState } from '../components/Job/FilterBar';

const Dashboard: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'Latest', // Default sort
    });

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

    const handleViewDetails = (job: Job) => {
        setSelectedJob(job);
    };

    const filteredJobs = jobsData.filter(job => {
        const keywordMatch = !filters.keyword ||
            job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.keyword.toLowerCase());

        const locationMatch = !filters.location || job.location === filters.location;
        const modeMatch = !filters.mode || job.mode === filters.mode;
        const expMatch = !filters.experience || job.experience === filters.experience;
        const sourceMatch = !filters.source || job.source === filters.source;

        return keywordMatch && locationMatch && modeMatch && expMatch && sourceMatch;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (filters.sort === 'Latest') {
            return a.postedDaysAgo - b.postedDaysAgo;
        } else {
            return b.postedDaysAgo - a.postedDaysAgo;
        }
    });

    return (
        <div style={{ paddingBottom: 'var(--space-5)' }}>
            <h1 className="placeholder-title" style={{ marginTop: 'var(--space-2)' }}>Dashboard</h1>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <p style={{ fontSize: '14px', color: 'rgba(17,17,17,0.7)' }}>
                    Showing {sortedJobs.length} {sortedJobs.length === 1 ? 'job' : 'jobs'}
                </p>
            </div>

            {sortedJobs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {sortedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobIds.includes(job.id)}
                            onSaveToggle={handleSaveToggle}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state" style={{ marginTop: 'var(--space-3)', alignItems: 'center', textAlign: 'center', padding: 'var(--space-5) var(--space-3)' }}>
                    <h2 className="empty-state__title" style={{ fontSize: 'var(--font-size-heading-lg)' }}>No jobs match your search.</h2>
                    <p className="empty-state__body">
                        Try adjusting your filters or search keywords.
                    </p>
                    <button
                        className="button button--secondary"
                        style={{ marginTop: 'var(--space-2)' }}
                        onClick={() => setFilters({ keyword: '', location: '', mode: '', experience: '', source: '', sort: 'Latest' })}
                    >
                        Clear Filters
                    </button>
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

export default Dashboard;
