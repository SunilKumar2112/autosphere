export interface ReviewData {
    id: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    sentiment: 'Positive' | 'Highly Positive' | 'Exceptional';
    verified: boolean;
    text: string;
    highlight: string;
}

export const REVIEWS: ReviewData[] = [
    {
        id: 'r1',
        author: 'Marcus Vance',
        role: 'Director of Logistics',
        company: 'Vanguard Dynamics',
        avatar: 'https://ui-avatars.com/api/?name=Marcus+Vance&background=0D0D0D&color=c9a96e&size=100',
        rating: 5,
        sentiment: 'Highly Positive',
        verified: true,
        highlight: 'Impeccable execution from start to finish.',
        text: 'Procuring a fleet of GT cars for our executive team was handled with a level of precision I’ve rarely seen. The communication, the transparency, and the white-glove delivery transcended standard automotive retail. They truly understand enterprise needs.'
    },
    {
        id: 'r2',
        author: 'Elena Rostova',
        role: 'Founder',
        company: 'Rostova Capital',
        avatar: 'https://ui-avatars.com/api/?name=Elena+Rostova&background=333&color=FFF&size=100',
        rating: 5,
        sentiment: 'Exceptional',
        verified: true,
        highlight: 'They don’t just sell cars; they curate rolling art.',
        text: 'The Aston Martin Vantage I acquired through AutoSphere was sourced with incredible care. The entire allocation process was seamless, entirely private, and respected my extremely limited schedule. An absolute masterclass in client relations.'
    },
    {
        id: 'r3',
        author: 'David Chen',
        role: 'Managing Partner',
        company: 'Horizon Ventures',
        avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=111&color=c9a96e&size=100',
        rating: 5,
        sentiment: 'Positive',
        verified: true,
        highlight: 'A remarkably frictionless acquisition process.',
        text: 'Transitioning from our previous broker to AutoSphere was a night and day difference. The rigorous mechanical vetting they apply to their inventory provided immense peace of mind. The Huracán EVO exceeded every expectation upon arrival.'
    }
];
