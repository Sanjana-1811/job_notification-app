import type { Job } from '../data/jobs';

export interface UserPreferences {
    roleKeywords: string[];
    preferredLocations: string[];
    preferredMode: ('Remote' | 'Hybrid' | 'Onsite')[];
    experienceLevel: string;
    skills: string[];
    minMatchScore: number;
}

export const calculateMatchScore = (job: Job, prefs: UserPreferences | null): number => {
    if (!prefs) return 0;

    let score = 0;

    // +25 if any roleKeyword appears in job.title (case-insensitive)
    if (prefs.roleKeywords.length > 0) {
        const titleLower = job.title.toLowerCase();
        const titleMatch = prefs.roleKeywords.some(keyword => {
            const kw = keyword.trim().toLowerCase();
            return kw && titleLower.includes(kw);
        });
        if (titleMatch) score += 25;
    }

    // +15 if any roleKeyword appears in job.description (case-insensitive)
    if (prefs.roleKeywords.length > 0) {
        const descLower = job.description.toLowerCase();
        const descMatch = prefs.roleKeywords.some(keyword => {
            const kw = keyword.trim().toLowerCase();
            return kw && descLower.includes(kw);
        });
        if (descMatch) score += 15;
    }

    // +15 if job.location matches preferredLocations
    if (prefs.preferredLocations.length > 0) {
        const locMatch = prefs.preferredLocations.some(
            loc => loc.trim().toLowerCase() === job.location.toLowerCase()
        );
        if (locMatch) score += 15;
    }

    // +10 if job.mode matches preferredMode
    if (prefs.preferredMode.length > 0 && prefs.preferredMode.includes(job.mode)) {
        score += 10;
    }

    // +10 if job.experience matches experienceLevel
    if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
        score += 10;
    }

    // +15 if overlap between job.skills and user.skills (any match)
    if (prefs.skills.length > 0 && job.skills.length > 0) {
        const userSkills = prefs.skills.map(s => s.trim().toLowerCase()).filter(Boolean);
        const jobSkills = job.skills.map(s => s.toLowerCase());

        const skillsMatch = userSkills.some(userSkill =>
            jobSkills.some(js => js.includes(userSkill) || userSkill.includes(js))
        );
        if (skillsMatch) score += 15;
    }

    // +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // +5 if source is LinkedIn
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap score at 100
    return Math.min(score, 100);
};

export const extractMaxSalary = (salaryStr: string): number => {
    // Try to parse "12-18 LPA" -> 18
    const lpaMatch = salaryStr.match(/(\d+(?:\.\d+)?)\s*LPA/i);
    if (lpaMatch) {
        return parseFloat(lpaMatch[1]) * 100000;
    }

    // Try to parse "₹15k–₹40k/month Internship" -> 40000
    const kMatch = salaryStr.match(/(\d+)k/ig);
    if (kMatch && kMatch.length > 0) {
        const lastK = kMatch[kMatch.length - 1]; // e.g. "40k"
        const val = parseInt(lastK.replace(/k/i, ''), 10);
        return val * 1000 * 12; // approximate annualized
    }

    return 0; // fallback if unparseable
};
