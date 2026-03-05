import React from 'react';

export interface FilterState {
    keyword: string;
    location: string;
    mode: string;
    experience: string;
    source: string;
    sort: 'Latest' | 'Oldest';
}

interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="card" style={{ padding: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)' }}>

                {/* Keyword Search */}
                <input
                    name="keyword"
                    value={filters.keyword}
                    onChange={handleChange}
                    placeholder="Search roles or companies..."
                    className="input"
                    style={{ padding: '8px 12px', gridColumn: '1 / -1' }}
                />

                {/* Location */}
                <select
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                    className="input"
                    style={{ padding: '8px 12px', appearance: 'auto' }}
                >
                    <option value="">All Locations</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Noida">Noida</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                </select>

                {/* Mode */}
                <select
                    name="mode"
                    value={filters.mode}
                    onChange={handleChange}
                    className="input"
                    style={{ padding: '8px 12px', appearance: 'auto' }}
                >
                    <option value="">All Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                </select>

                {/* Experience */}
                <select
                    name="experience"
                    value={filters.experience}
                    onChange={handleChange}
                    className="input"
                    style={{ padding: '8px 12px', appearance: 'auto' }}
                >
                    <option value="">All Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1">0-1 Years</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                </select>

                {/* Source */}
                <select
                    name="source"
                    value={filters.source}
                    onChange={handleChange}
                    className="input"
                    style={{ padding: '8px 12px', appearance: 'auto' }}
                >
                    <option value="">All Sources</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                </select>

                {/* Sort */}
                <select
                    name="sort"
                    value={filters.sort}
                    onChange={handleChange}
                    className="input"
                    style={{ padding: '8px 12px', appearance: 'auto' }}
                >
                    <option value="Latest">Latest</option>
                    <option value="Oldest">Oldest</option>
                </select>

            </div>
        </div>
    );
};

export default FilterBar;
