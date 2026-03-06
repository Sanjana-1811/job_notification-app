import React from 'react';
import type { Job } from '../../data/jobs';
import type { JobStatusType } from '../../hooks/useJobStatus';

interface JobCardProps {
    job: Job;
    isSaved?: boolean;
    matchScore?: number;
    status?: JobStatusType;
    onSaveToggle: (jobId: string) => void;
    onViewDetails: (job: Job) => void;
    onStatusChange?: (jobId: string, status: JobStatusType) => void;
}

const getScoreColor = (score: number) => {
    if (score >= 80) return 'var(--color-success)'; // Assume we need to add this or use a green hex, let's use explicit colors:
    if (score >= 60) return '#D97706'; // Amber
    if (score >= 40) return 'var(--color-text)'; // Neutral
    return 'rgba(17,17,17,0.4)'; // Subtle grey
};

const getScoreBackground = (score: number) => {
    if (score >= 80) return 'rgba(16, 185, 129, 0.1)'; // Light Green
    if (score >= 60) return 'rgba(217, 119, 6, 0.1)'; // Light Amber
    if (score >= 40) return 'rgba(17,17,17,0.05)'; // Light Neutral
    return 'rgba(17,17,17,0.02)'; // Lighter grey
};

const getStatusColor = (status: JobStatusType) => {
    switch (status) {
        case 'Applied': return '#2563EB'; // Blue
        case 'Rejected': return 'var(--color-accent)'; // Red
        case 'Selected': return 'var(--color-success)'; // Green
        default: return 'var(--color-text)'; // Neutral
    }
};

const getStatusBackground = (status: JobStatusType) => {
    switch (status) {
        case 'Applied': return 'rgba(37, 99, 235, 0.1)';
        case 'Rejected': return 'rgba(139, 0, 0, 0.1)';
        case 'Selected': return 'rgba(47, 107, 79, 0.1)';
        default: return 'rgba(17,17,17,0.05)';
    }
};

const JobCard: React.FC<JobCardProps> = ({ job, isSaved = false, matchScore, status = 'Not Applied', onSaveToggle, onViewDetails, onStatusChange }) => {
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
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {matchScore !== undefined && (
                        <div style={{
                            background: getScoreBackground(matchScore),
                            color: getScoreColor(matchScore),
                            border: `1px solid ${getScoreColor(matchScore)}`,
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            ✨ {matchScore}% Match
                        </div>
                    )}
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-1)' }}>
                <div style={{ fontSize: '13px', color: 'rgba(17,17,17,0.5)' }}>
                    Posted {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
                </div>
                {onStatusChange && (
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(job.id, e.target.value as JobStatusType)}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: getStatusColor(status),
                            background: getStatusBackground(status),
                            border: `1px solid ${getStatusColor(status)}`,
                            appearance: 'auto'
                        }}
                    >
                        <option value="Not Applied">Not Applied</option>
                        <option value="Applied">Applied</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Selected">Selected</option>
                    </select>
                )}
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
