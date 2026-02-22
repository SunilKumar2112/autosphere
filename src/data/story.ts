export interface StoryPanelData {
    id: string;
    image: string;
    number: string;
    label: string;
    title: string;
    description: string;
}

export const STORY_STEPS: StoryPanelData[] = [
    {
        id: 's1',
        image: '/cars/story-1.png',
        number: '01',
        label: 'The Foundation',
        title: 'Forged in Passion',
        description:
            'AutoSphere began in 2004 with a singular vision: to curate the world\u2019s most extraordinary vehicles for those who demand nothing but the absolute pinnacle of automotive engineering.',
    },
    {
        id: 's2',
        image: '/cars/story-2.png',
        number: '02',
        label: 'The Curation',
        title: 'Uncompromising Standards',
        description:
            'Every vehicle in our collection undergoes a rigorous 300-point inspection. We don\u2019t just sell cars; we act as custodians of automotive history, ensuring perfection in every detail.',
    },
    {
        id: 's3',
        image: '/cars/story-3.png',
        number: '03',
        label: 'The Experience',
        title: 'Beyond the Drive',
        description:
            'From private track days to exclusive concierge services, the AutoSphere experience extends far beyond the moment you take the keys. We build lasting relationships with fellow enthusiasts.',
    },
    {
        id: 's4',
        image: '/cars/story-4.png',
        number: '04',
        label: 'The Future',
        title: 'Driving Innovation',
        description:
            'As the automotive landscape evolves, so do we. Embracing the latest in hybrid hypercars and elite electric performance, we remain at the cutting edge of driving exhilaration.',
    }
];
