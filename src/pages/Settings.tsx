import React, { useState, useEffect } from 'react';
import type { UserPreferences } from '../utils/scoring';

const LOCATION_OPTIONS = [
    "Bengaluru", "Mumbai", "Pune", "Hyderabad", "Chennai", "Gurugram", "Noida", "Delhi NCR", "Remote"
];

const Settings: React.FC = () => {
    const [preferences, setPreferences] = useState<UserPreferences>({
        roleKeywords: [],
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: '',
        skills: [],
        minMatchScore: 40
    });

    const [localKeywords, setLocalKeywords] = useState('');
    const [localSkills, setLocalSkills] = useState('');
    const [savedMessage, setSavedMessage] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as UserPreferences;
                setPreferences(parsed);
                setLocalKeywords(parsed.roleKeywords.join(', '));
                setLocalSkills(parsed.skills.join(', '));
            } catch (e) {
                console.error('Failed to parse preferences', e);
            }
        }
    }, []);

    const handleSave = () => {
        const updatedPreferences = {
            ...preferences,
            roleKeywords: localKeywords.split(',').map(s => s.trim()).filter(Boolean),
            skills: localSkills.split(',').map(s => s.trim()).filter(Boolean)
        };

        setPreferences(updatedPreferences);
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(updatedPreferences));
        setSavedMessage('Preferences saved successfully!');
        setTimeout(() => setSavedMessage(''), 3000);
    };

    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalKeywords(e.target.value);
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSkills(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setPreferences(prev => ({ ...prev, preferredLocations: selected }));
    };

    const handleModeToggle = (mode: 'Remote' | 'Hybrid' | 'Onsite') => {
        setPreferences(prev => {
            const includes = prev.preferredMode.includes(mode);
            if (includes) {
                return { ...prev, preferredMode: prev.preferredMode.filter(m => m !== mode) };
            } else {
                return { ...prev, preferredMode: [...prev.preferredMode, mode] };
            }
        });
    };

    return (
        <div className="placeholder-page" style={{ paddingTop: 'var(--space-3)' }}>
            <h1 className="placeholder-title">Tracking Preferences</h1>
            <p className="placeholder-subtitle" style={{ marginBottom: 'var(--space-4)' }}>
                Define your criteria. We'll find only the jobs that match.
            </p>

            <div className="card card--workspace">
                <div className="field-group">
                    <div className="field-group__label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <label className="field-group__label" htmlFor="keywords">
                            Role keywords
                        </label>
                        <span className="field-group__hint">Comma-separated</span>
                    </div>
                    <input
                        id="keywords"
                        className="input"
                        placeholder="e.g. Frontend Engineer, React"
                        value={localKeywords}
                        onChange={handleKeywordsChange}
                    />
                </div>

                <div className="field-group">
                    <div className="field-group__label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <label className="field-group__label" htmlFor="skills">
                            Skills
                        </label>
                        <span className="field-group__hint">Comma-separated</span>
                    </div>
                    <input
                        id="skills"
                        className="input"
                        placeholder="e.g. JavaScript, CSS, HTML"
                        value={localSkills}
                        onChange={handleSkillsChange}
                    />
                </div>

                <div className="field-group">
                    <div className="field-group__label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <label className="field-group__label" htmlFor="locations">
                            Preferred locations
                        </label>
                        <span className="field-group__hint">Hold Ctrl/Cmd to select multiple</span>
                    </div>
                    <select
                        id="locations"
                        multiple
                        className="input input--multiline"
                        style={{ minHeight: '120px' }}
                        value={preferences.preferredLocations}
                        onChange={handleLocationChange}
                    >
                        {LOCATION_OPTIONS.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>

                <div className="field-group">
                    <div className="field-group__label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <div className="field-group__label">Work mode</div>
                    </div>
                    <div className="button-row">
                        {['Remote', 'Hybrid', 'Onsite'].map(m => {
                            const mode = m as 'Remote' | 'Hybrid' | 'Onsite';
                            const isActive = preferences.preferredMode.includes(mode);
                            return (
                                <button
                                    key={mode}
                                    className={`button ${isActive ? 'button--primary' : 'button--secondary'}`}
                                    type="button"
                                    onClick={() => handleModeToggle(mode)}
                                >
                                    {mode}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="field-group">
                    <div className="field-group__label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <label className="field-group__label" htmlFor="experience">Experience level</label>
                    </div>
                    <select
                        id="experience"
                        className="input"
                        style={{ appearance: 'auto' }}
                        value={preferences.experienceLevel}
                        onChange={(e) => setPreferences(prev => ({ ...prev, experienceLevel: e.target.value }))}
                    >
                        <option value="">Any</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                    </select>
                </div>

                <div className="field-group">
                    <div className="field-group__label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <label className="field-group__label" htmlFor="score">
                            Minimum Match Score Threshold ({preferences.minMatchScore})
                        </label>
                        <span className="field-group__hint">0 - 100</span>
                    </div>
                    <input
                        type="range"
                        id="score"
                        min="0"
                        max="100"
                        step="5"
                        value={preferences.minMatchScore}
                        onChange={(e) => setPreferences(prev => ({ ...prev, minMatchScore: parseInt(e.target.value, 10) }))}
                        style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-accent)' }}
                    />
                </div>

                <div style={{ marginTop: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <button className="button button--primary" type="button" onClick={handleSave}>
                        Save Preferences
                    </button>
                    {savedMessage && <span style={{ color: 'var(--color-success)', fontSize: '14px', fontWeight: 500 }}>{savedMessage}</span>}
                </div>
            </div>
        </div>
    );
};

export default Settings;
