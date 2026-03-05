import React from 'react';
import type { Job } from '../../data/jobs';

interface JobCardProps {
    job: Job;
    isSaved?: boolean;
    onSaveToggle: (jobId: string) => void;
    onViewDetails: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSaved = false, onSaveToggle, onViewDetails }) => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-heading-lg)', color: 'var(--color-text)' }}>
                        {job.title}
                    </h3>
                    <div style={{ fontSize: 'var(--font-size-body)', fontWeight: 500, color: 'var(--color-accent)', marginTop: '4px' }}>
                        {job.company}
                    </div>
                </div>
                <div style={{
                    background: 'rgba(17,17,17,0.05)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500
                }}>
                    {job.source}
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', fontSize: '14px', color: 'rgba(17,17,17,0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>📍</span> {job.location} • {job.mode}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>💼</span> Exp: {job.experience}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>💰</span> {job.salaryRange}
                </div>
            </div>

            <div style={{ fontSize: '13px', color: 'rgba(17,17,17,0.5)', marginTop: 'var(--space-1)' }}>
                Posted {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
            </div>

            <div className="button-row" style={{ marginTop: 'var(--space-2)' }}>
                <button className="button button--secondary" onClick={() => onViewDetails(job)} style={{ flex: 1 }}>
                    View Details
                </button>
                <button
                    className="button button--secondary"
                    onClick={() => onSaveToggle(job.id)}
                    style={{ width: '48px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', color: isSaved ? 'var(--color-accent)' : 'inherit' }}
                    title={isSaved ? "Remove from saved" : "Save job"}
                >
                    {isSaved ? '★' : '☆'}
                </button>
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button--primary"
                    style={{ flex: 1, textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    Apply
                </a>
            </div>
        </div>
    );
};

export default JobCard;
