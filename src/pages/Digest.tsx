import React, { useState, useEffect, useMemo } from 'react';
import { jobsData } from '../data/jobs';
import type { Job } from '../data/jobs';
import { calculateMatchScore } from '../utils/scoring';
import type { UserPreferences } from '../utils/scoring';
import { Copy, Mail } from 'lucide-react';
import { useJobStatus } from '../hooks/useJobStatus';

// Quick redefine for standalone Digest email styling:
const getBadgeStyles = (status: string) => {
    switch (status) {
        case 'Applied': return { color: '#2563EB', background: 'rgba(37, 99, 235, 0.1)' };
        case 'Rejected': return { color: 'var(--color-accent)', background: 'rgba(139, 0, 0, 0.1)' };
        case 'Selected': return { color: 'var(--color-success)', background: 'rgba(47, 107, 79, 0.1)' };
        default: return { color: 'var(--color-text)', background: 'rgba(17,17,17,0.05)' };
    }
};

interface DigestJob extends Job {
    matchScore: number;
}

const Digest: React.FC = () => {
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [digestJobs, setDigestJobs] = useState<DigestJob[] | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const { statuses } = useJobStatus();

    const recentUpdates = useMemo(() => {
        return Object.entries(statuses)
            .filter(([_, record]) => record.status !== 'Not Applied')
            .map(([jobId, record]) => {
                const job = jobsData.find(j => j.id === jobId);
                return {
                    ...record,
                    job
                };
            })
            .filter(update => update.job !== undefined)
            .sort((a, b) => new Date(b.dateChanged).getTime() - new Date(a.dateChanged).getTime());
    }, [statuses]);

    const todayStr = useMemo(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }, []);

    const digestKey = `jobTrackerDigest_${todayStr}`;

    useEffect(() => {
        const storedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (storedPrefs) {
            try {
                setPreferences(JSON.parse(storedPrefs));
            } catch (e) {
                console.error('Failed to parse preferences', e);
            }
        }

        const savedDigest = localStorage.getItem(digestKey);
        if (savedDigest) {
            try {
                setDigestJobs(JSON.parse(savedDigest));
            } catch (e) {
                console.error('Failed to parse digest', e);
            }
        }
    }, [digestKey]);

    const handleGenerateDigest = () => {
        if (!preferences) return;

        const scoredJobs: DigestJob[] = jobsData
            .map(job => ({ ...job, matchScore: calculateMatchScore(job, preferences) }))
            .filter(job => job.matchScore >= preferences.minMatchScore);

        // Sort: 1) matchScore descending, 2) postedDaysAgo ascending
        scoredJobs.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            }
            return a.postedDaysAgo - b.postedDaysAgo;
        });

        const top10 = scoredJobs.slice(0, 10);
        setDigestJobs(top10);
        localStorage.setItem(digestKey, JSON.stringify(top10));
    };

    const getPlainTextDigest = () => {
        if (!digestJobs) return '';

        let text = `Top ${digestJobs.length} Jobs For You — 9AM Digest (${todayStr})\n\n`;
        digestJobs.forEach((job, idx) => {
            text += `${idx + 1}. ${job.title} at ${job.company} [${job.matchScore}% Match]\n`;
            text += `   📍 ${job.location} | 💼 Exp: ${job.experience}\n`;
            text += `   🔗 Apply: ${job.applyUrl}\n\n`;
        });

        if (recentUpdates.length > 0) {
            text += `\n--- Recent Status Updates ---\n`;
            recentUpdates.forEach(update => {
                if (update.job) {
                    text += `${update.job.title} at ${update.job.company} -> [${update.status}]\n`;
                }
            });
            text += `\n`;
        }

        text += `This digest was generated based on your preferences.`;
        return text;
    };

    const handleCopy = async () => {
        const text = getPlainTextDigest();
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy text', err);
        }
    };

    const handleEmailDraft = () => {
        const subject = encodeURIComponent("My 9AM Job Digest");
        const body = encodeURIComponent(getPlainTextDigest());
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    if (!preferences) {
        return (
            <div className="placeholder-page" style={{ paddingTop: 'var(--space-5)' }}>
                <h1 className="placeholder-title">Daily Digest</h1>
                <div style={{
                    background: 'rgba(139, 0, 0, 0.05)',
                    color: 'var(--color-accent)',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    border: '1px solid rgba(139, 0, 0, 0.1)',
                    marginTop: 'var(--space-4)',
                    fontWeight: 500,
                    textAlign: 'center'
                }}>
                    Set preferences to generate a personalized digest.
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: 'var(--space-5)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ width: '100%', maxWidth: '720px', marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 'var(--space-2)', borderBottom: '2px solid rgba(17,17,17,0.1)', marginBottom: 'var(--space-4)' }}>
                <div>
                    <h1 className="placeholder-title" style={{ margin: 0 }}>Daily Digest</h1>
                    <p style={{ fontSize: '13px', color: 'rgba(17,17,17,0.5)', marginTop: '4px' }}>
                        Demo Mode: Daily 9AM trigger simulated manually.
                    </p>
                </div>

                {!digestJobs && (
                    <button className="button button--primary" onClick={handleGenerateDigest}>
                        Generate Today's 9AM Digest (Simulated)
                    </button>
                )}
            </div>

            {digestJobs && digestJobs.length === 0 && (
                <div className="empty-state" style={{ width: '100%', maxWidth: '720px', marginTop: 'var(--space-2)' }}>
                    <h2 className="empty-state__title">No matching roles today.</h2>
                    <p className="empty-state__body">
                        Check again tomorrow or lower your match threshold in settings.
                    </p>
                </div>
            )}

            {digestJobs && digestJobs.length > 0 && (
                <div style={{
                    width: '100%',
                    maxWidth: '720px',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(17,17,17,0.05)',
                    overflow: 'hidden'
                }}>
                    {/* Email Header */}
                    <div style={{
                        background: 'var(--color-bg)',
                        padding: 'var(--space-4)',
                        borderBottom: '1px solid rgba(17,17,17,0.05)',
                        textAlign: 'center'
                    }}>
                        <h2 style={{
                            margin: 0,
                            fontFamily: 'var(--font-family-serif)',
                            fontSize: '24px',
                            color: 'var(--color-accent)'
                        }}>
                            Top {digestJobs.length} Jobs For You — 9AM Digest
                        </h2>
                        <p style={{ margin: '8px 0 0 0', color: 'rgba(17,17,17,0.6)', fontSize: '14px', fontWeight: 500 }}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    {/* Email Body */}
                    <div style={{ padding: 'var(--space-2)' }}>
                        {digestJobs.map((job, idx) => (
                            <div key={job.id} style={{
                                padding: 'var(--space-3)',
                                borderBottom: idx !== digestJobs.length - 1 ? '1px solid rgba(17,17,17,0.05)' : 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontFamily: 'var(--font-family-serif)' }}>
                                            {idx + 1}. {job.title}
                                        </h3>
                                        <div style={{ fontSize: '14px', color: 'var(--color-accent)', fontWeight: 500, marginTop: '2px' }}>
                                            {job.company}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        color: 'var(--color-success)',
                                        padding: '2px 8px',
                                        borderRadius: '999px',
                                        fontSize: '11px',
                                        fontWeight: 700
                                    }}>
                                        {job.matchScore}%
                                    </div>
                                </div>

                                <div style={{ fontSize: '13px', color: 'rgba(17,17,17,0.7)', display: 'flex', gap: '16px' }}>
                                    <span>📍 {job.location} ({job.mode})</span>
                                    <span>💼 Exp: {job.experience}</span>
                                </div>

                                <div style={{ marginTop: '8px' }}>
                                    <a
                                        href={job.applyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-block',
                                            background: 'var(--color-accent)',
                                            color: 'white',
                                            padding: '6px 16px',
                                            borderRadius: '4px',
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Status Updates */}
                    {recentUpdates.length > 0 && (
                        <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '2px solid rgba(17,17,17,0.05)', background: '#FAFAFA' }}>
                            <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: '16px', fontFamily: 'var(--font-family-serif)', color: 'var(--color-text)' }}>
                                Recent Status Updates
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {recentUpdates.map((update) => {
                                    if (!update.job) return null;
                                    const { color, background } = getBadgeStyles(update.status);
                                    return (
                                        <div key={update.job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid rgba(17,17,17,0.05)' }}>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: 600 }}>{update.job.title}</div>
                                                <div style={{ fontSize: '13px', color: 'rgba(17,17,17,0.6)' }}>{update.job.company}</div>
                                                <div style={{ fontSize: '11px', color: 'rgba(17,17,17,0.4)', marginTop: '4px' }}>
                                                    {new Date(update.dateChanged).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div style={{
                                                background,
                                                color,
                                                border: `1px solid ${color}`,
                                                padding: '4px 12px',
                                                borderRadius: '999px',
                                                fontSize: '12px',
                                                fontWeight: 600
                                            }}>
                                                {update.status}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Email Footer & Actions */}
                    <div style={{
                        background: 'var(--color-bg)',
                        padding: 'var(--space-3) var(--space-4)',
                        borderTop: '1px solid rgba(17,17,17,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <p style={{ margin: 0, fontSize: '12px', color: 'rgba(17,17,17,0.5)', textAlign: 'center' }}>
                            This digest was generated based on your preferences.
                        </p>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={handleCopy}
                                className="button button--secondary"
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '6px 12px' }}
                            >
                                <Copy size={14} />
                                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                            <button
                                onClick={handleEmailDraft}
                                className="button button--secondary"
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '6px 12px' }}
                            >
                                <Mail size={14} />
                                Create Email Draft
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Digest;
