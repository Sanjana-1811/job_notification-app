import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Job } from '../../data/jobs';

interface JobModalProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
    isSaved?: boolean;
    onSaveToggle: (jobId: string) => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose, isSaved = false, onSaveToggle }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            setTimeout(() => setIsVisible(false), 200); // Wait for transition
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(17, 17, 17, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: 'var(--space-2)',
                opacity: isOpen ? 1 : 0,
                transition: 'opacity var(--transition-medium)'
            }}
            onClick={onClose}
        >
            <div
                className="card"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    padding: 'var(--space-4)',
                    transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'transform var(--transition-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-2)',
                        right: 'var(--space-2)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: 'var(--color-text)'
                    }}
                >
                    <X size={24} />
                </button>

                {job && (
                    <>
                        <div>
                            <h2 style={{ margin: 0, fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-heading-xl)', color: 'var(--color-text)', paddingRight: '32px' }}>
                                {job.title}
                            </h2>
                            <div style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 500, color: 'var(--color-accent)', marginTop: '8px' }}>
                                {job.company}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)', padding: 'var(--space-2) 0', borderTop: 'var(--border-subtle)', borderBottom: 'var(--border-subtle)' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'rgba(17,17,17,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</div>
                                <div style={{ fontWeight: 500 }}>{job.location} ({job.mode})</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'rgba(17,17,17,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</div>
                                <div style={{ fontWeight: 500 }}>{job.experience}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'rgba(17,17,17,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Salary</div>
                                <div style={{ fontWeight: 500 }}>{job.salaryRange}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'rgba(17,17,17,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</div>
                                <div style={{ fontWeight: 500 }}>{job.source}</div>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>Job Description</h3>
                            <p style={{ lineHeight: 'var(--line-height-relaxed)', color: 'rgba(17,17,17,0.8)' }}>
                                {job.description}
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>Skills</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {job.skills.map(skill => (
                                    <span key={skill} style={{
                                        background: 'rgba(139, 0, 0, 0.05)',
                                        color: 'var(--color-accent)',
                                        padding: '4px 12px',
                                        borderRadius: '999px',
                                        fontSize: '13px',
                                        fontWeight: 500
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="button-row" style={{ marginTop: 'var(--space-2)', paddingTop: 'var(--space-3)', borderTop: 'var(--border-subtle)' }}>
                            <button
                                className="button button--secondary"
                                onClick={() => onSaveToggle(job.id)}
                                style={{ flex: 1, color: isSaved ? 'var(--color-accent)' : 'inherit', borderColor: isSaved ? 'var(--color-accent)' : undefined }}
                            >
                                {isSaved ? '★ Saved' : '☆ Save Job'}
                            </button>
                            <a
                                href={job.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button button--primary"
                                style={{ flex: 2, textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                Apply Now
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default JobModal;
