import React from 'react';

const Settings: React.FC = () => {
    return (
        <div className="placeholder-page">
            <h1 className="placeholder-title">Tracking Preferences</h1>
            <p className="placeholder-subtitle" style={{ marginBottom: 'var(--space-4)' }}>
                Define your criteria. We'll find only the jobs that match.
            </p>

            <div className="card card--workspace">
                <div className="field-group">
                    <div className="field-group__label-row">
                        <label className="field-group__label" htmlFor="keywords">
                            Role keywords
                        </label>
                        <span className="field-group__hint">e.g. Frontend Engineer, React</span>
                    </div>
                    <input
                        id="keywords"
                        className="input"
                        placeholder="Enter job titles or required skills"
                    />
                </div>

                <div className="field-group">
                    <div className="field-group__label-row">
                        <label className="field-group__label" htmlFor="locations">
                            Preferred locations
                        </label>
                        <span className="field-group__hint">e.g. New York, London, Remote</span>
                    </div>
                    <input
                        id="locations"
                        className="input"
                        placeholder="Where do you want to work?"
                    />
                </div>

                <div className="field-group">
                    <div className="field-group__label-row">
                        <div className="field-group__label">Work mode</div>
                    </div>
                    <div className="button-row">
                        <button className="button button--secondary" type="button">Remote</button>
                        <button className="button button--secondary" type="button">Hybrid</button>
                        <button className="button button--secondary" type="button">Onsite</button>
                    </div>
                </div>

                <div className="field-group">
                    <div className="field-group__label-row">
                        <div className="field-group__label">Experience level</div>
                    </div>
                    <select className="input" style={{ appearance: 'auto' }}>
                        <option>Select level...</option>
                        <option>Entry-level / Junior</option>
                        <option>Mid-level</option>
                        <option>Senior</option>
                        <option>Staff / Principal</option>
                    </select>
                </div>

                <div style={{ marginTop: 'var(--space-2)' }}>
                    <button className="button button--primary" type="button">Save Preferences</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
