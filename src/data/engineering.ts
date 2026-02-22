

export interface StatData {
    id: string;
    iconSvg: string; // Storing raw SVG strings for portability in data
    value: number;
    suffix: string;
    label: string;
    description: string;
}

export const ENGINEERING_STATS: StatData[] = [
    {
        id: 'hp',
        iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>',
        value: 1200,
        suffix: 'HP',
        label: 'Peak Performance',
        description: 'Engineering that pushes the boundaries of mechanical artistry.',
    },
    {
        id: 'accel',
        iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>',
        value: 2.4,
        suffix: 's',
        label: '0–100 KM/H',
        description: 'From stillness to velocity in the span of a single breath.',
    },
    {
        id: 'curated',
        iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>',
        value: 47,
        suffix: '',
        label: 'Models Curated',
        description: 'Each one hand-selected from the world\'s most prestigious marques.',
    },
];
