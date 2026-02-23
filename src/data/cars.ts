/**
 * Car Data — Real specs sourced from the Kaggle "Sports Car Prices" dataset
 * (rkiattisak/sports-car-prices-dataset) and manufacturer specifications.
 *
 * Fields: Make, Model, Year, Engine Size (L), Horsepower, Torque (lb-ft),
 *         0-60 MPH Time (s), Price (USD)
 */

export interface CarSpec {
    label: string;
    value: string;
}

export interface Car {
    id: string;
    name: string;
    brand: string;
    year: number;
    price: string;
    priceNum: number;
    type: string;
    condition: string;
    tagline: string;
    description: string;
    image: string;
    gallery: string[];
    sketchfabUrl?: string;
    specs: CarSpec[];
    features: string[];
}

// Data sourced from Kaggle Sports Car Prices dataset + official manufacturer specs
// All images: User-provided high-quality AI-generated automotive photography
export const CARS: Car[] = [
    {
        id: 'porsche-911-gt3-rs',
        name: '911 GT3 RS',
        brand: 'Porsche',
        year: 2024,
        price: '$223,800',
        priceNum: 223800,
        type: 'Sports Car',
        condition: 'New',
        tagline: 'Track-bred. Road-legal.',
        description:
            'The 911 GT3 RS is the ultimate naturally aspirated track weapon — a 4.0-liter flat-six producing 518 hp, mated to a 7-speed PDK and equipped with a DRS-style rear wing straight from motorsport. Every component is engineered to shave milliseconds off lap times.',
        image: '/cars/porsche-911-gt3-rs-1.png',
        gallery: [
            '/cars/porsche-911-gt3-rs-1.png',
            '/cars/porsche-911-gt3-rs-2.png',
            '/cars/porsche-911-gt3-rs-3.png',
            '/cars/porsche-911-gt3-rs-4.png',
        ],
        specs: [
            { label: 'Engine', value: '4.0L Naturally Aspirated Flat-6' },
            { label: 'Horsepower', value: '518 HP @ 8,500 rpm' },
            { label: 'Torque', value: '346 lb-ft @ 6,300 rpm' },
            { label: '0-60 mph', value: '3.0s' },
            { label: 'Top Speed', value: '184 mph' },
            { label: 'Weight', value: '3,268 lbs' },
            { label: 'Transmission', value: '7-Speed PDK RWD' },
            { label: 'Exterior', value: 'Ice Grey Metallic' },
            { label: 'Interior', value: 'Race-Tex / Black Leather' },
            { label: 'Mileage', value: '12 Delivery Miles' },
        ],
        features: ['Weissach Package', 'Magnesium Forged Wheels', 'PCCB (Ceramic Brakes)', 'Carbon Fiber Full Bucket Seats', 'Club Sport Package (Roll Cage)'],
        sketchfabUrl: 'https://sketchfab.com/models/e738eae819c34d19a31dd066c45e0f3d/embed?autospin=1&autostart=1&preload=1&transparent=1',
    },
    {
        id: 'lamborghini-huracan-evo',
        name: 'Huracán EVO',
        brand: 'Lamborghini',
        year: 2024,
        price: '$269,571',
        priceNum: 269571,
        type: 'Supercar',
        condition: 'New',
        tagline: 'Unleash every emotion.',
        description:
            'The Huracán EVO represents the next evolution of the V10 Lamborghini — featuring LDVI predictive technology, rear-wheel steering, and a naturally aspirated 5.2L V10 delivering 630 hp of pure Italian fury. The exhaust note alone is worth the price of admission.',
        image: '/cars/lamborghini-huracan-evo-1.png',
        gallery: [
            '/cars/lamborghini-huracan-evo-1.png',
            '/cars/lamborghini-huracan-evo-2.png',
            '/cars/lamborghini-huracan-evo-3.png',
            '/cars/lamborghini-huracan-evo-4.png',
        ],
        specs: [
            { label: 'Engine', value: '5.2L Naturally Aspirated V10' },
            { label: 'Horsepower', value: '630 HP @ 8,000 rpm' },
            { label: 'Torque', value: '443 lb-ft @ 6,500 rpm' },
            { label: '0-60 mph', value: '2.9s' },
            { label: 'Top Speed', value: '202 mph' },
            { label: 'Weight', value: '3,135 lbs' },
            { label: 'Transmission', value: '7-Speed LDF Dual-Clutch' },
            { label: 'Exterior', value: 'Rosso Mars Metallic' },
            { label: 'Interior', value: 'Nero Ade Alcantara / Rosso Stitching' },
            { label: 'Mileage', value: '45 Miles' },
        ],
        features: ['LDVI Predictive Technology', 'Rear-Wheel Steering', 'Lifting System with Magneto-rheologic Suspension', 'Sensonum Premium Audio System', 'Forged Composites Interior Components'],
        sketchfabUrl: 'https://sketchfab.com/models/f72666fc65d548798482044124286642/embed',
    },
    {
        id: 'ferrari-f8-tributo',
        name: 'F8 Tributo',
        brand: 'Ferrari',
        year: 2024,
        price: '$280,000',
        priceNum: 280000,
        type: 'Supercar',
        condition: 'New',
        tagline: 'The essence of pure performance.',
        description:
            'The F8 Tributo is a tribute to Ferrari\'s V8 heritage — its 3.9L twin-turbo V8 delivers a staggering 710 hp, making it the most powerful V8 in Ferrari history. The aero is derived directly from the 488 Pista, delivering 15% more downforce than the 488 GTB.',
        image: '/cars/ferrari-f8-tributo-1.png',
        gallery: [
            '/cars/ferrari-f8-tributo-1.png',
            '/cars/ferrari-f8-tributo-2.png',
            '/cars/ferrari-f8-tributo-3.png',
            '/cars/ferrari-f8-tributo-4.png',
        ],
        specs: [
            { label: 'Engine', value: '3.9L Twin-Turbo V8' },
            { label: 'Horsepower', value: '710 HP @ 8,000 rpm' },
            { label: 'Torque', value: '568 lb-ft @ 3,250 rpm' },
            { label: '0-60 mph', value: '2.9s' },
            { label: 'Top Speed', value: '211 mph' },
            { label: 'Weight', value: '2,932 lbs' },
            { label: 'Transmission', value: '7-Speed F1 Dual-Clutch' },
            { label: 'Exterior', value: 'Rosso Scuderia' },
            { label: 'Interior', value: 'Crema Leather / Carbon Accents' },
            { label: 'Mileage', value: '85 Miles' },
        ],
        features: ['Carbon Fiber Racing Seats', 'Suspension Lifter', 'Scuderia Ferrari Shields on Fenders', 'Passenger Display Screen', 'JBL Professional Sound System'],
        sketchfabUrl: 'https://sketchfab.com/models/8a86c4d634f64f8b8ee836bc93fa6ac8/embed?autospin=1&autostart=1&preload=1&transparent=1',
    },
    {
        id: 'mclaren-720s',
        name: '720S',
        brand: 'McLaren',
        year: 2023,
        price: '$299,000',
        priceNum: 299000,
        type: 'Supercar',
        condition: 'Certified Pre-Owned',
        tagline: 'Raise your limits.',
        description:
            'The 720S redefines the supercar experience with a carbon fiber Monocage II chassis, dihedral doors, and a 4.0L twin-turbo V8 producing 710 hp. Its driver-centric design erases the line between road and track, delivering a raw yet refined driving experience.',
        image: '/cars/mclaren-720s-1.png',
        gallery: [
            '/cars/mclaren-720s-1.png',
            '/cars/mclaren-720s-2.png',
            '/cars/mclaren-720s-3.png',
            '/cars/mclaren-720s-4.png',
        ],
        specs: [
            { label: 'Engine', value: '4.0L Twin-Turbo V8 M840T' },
            { label: 'Horsepower', value: '710 HP @ 7,250 rpm' },
            { label: 'Torque', value: '568 lb-ft @ 5,500 rpm' },
            { label: '0-60 mph', value: '2.8s' },
            { label: 'Top Speed', value: '212 mph' },
            { label: 'Weight', value: '2,828 lbs' },
            { label: 'Transmission', value: '7-Speed SSG Seamless Shift' },
            { label: 'Exterior', value: 'Papaya Spark MSO' },
            { label: 'Interior', value: 'Carbon Black Alcantara' },
            { label: 'Mileage', value: '1,240 Miles' },
        ],
        features: ['720S Performance Pack', 'Carbon Fiber Exterior Upgrade Pack 1, 2, & 3', 'Bowers & Wilkins 12-Speaker System', 'Track Telemetry App & Cameras', 'Vehicle Lift'],
        sketchfabUrl: 'https://sketchfab.com/models/e820cf40821940bcafebf24bec693d16/embed?autospin=1&autostart=1&preload=1&transparent=1',
    },
    {
        id: 'mercedes-amg-gt-r',
        name: 'AMG GT-R',
        brand: 'Mercedes-Benz',
        year: 2024,
        price: '$162,900',
        priceNum: 162900,
        type: 'Grand Tourer',
        condition: 'New',
        tagline: 'Born on the Green Hell.',
        description:
            'Forged on the Nürburgring Nordschleife, the AMG GT-R is the pinnacle of Mercedes racing DNA for the road. Its handcrafted 4.0L bi-turbo V8 and active aerodynamics deliver 577 hp of precision aggression. "The Beast of the Green Hell" is more than a nickname.',
        image: '/cars/mercedes-amg-gt-r-1.png',
        gallery: [
            '/cars/mercedes-amg-gt-r-1.png',
            '/cars/mercedes-amg-gt-r-2.png',
            '/cars/mercedes-amg-gt-r-3.png',
            '/cars/mercedes-amg-gt-r-4.png',
        ],
        specs: [
            { label: 'Engine', value: '4.0L Bi-Turbo V8 (Hot Inner-V)' },
            { label: 'Horsepower', value: '577 HP @ 6,250 rpm' },
            { label: 'Torque', value: '516 lb-ft @ 1,900 rpm' },
            { label: '0-60 mph', value: '3.5s' },
            { label: 'Top Speed', value: '198 mph' },
            { label: 'Weight', value: '3,594 lbs' },
            { label: 'Transmission', value: '7-Speed AMG SPEEDSHIFT DCT' },
            { label: 'Exterior', value: 'AMG Green Hell Magno' },
            { label: 'Interior', value: 'Exclusive Nappa Leather / DINAMICA' },
            { label: 'Mileage', value: '24 Miles' },
        ],
        features: ['AMG Track Pace', 'Burmester High-End Surround Sound', 'Carbon Fiber Roof Component', 'AMG Ceramic High-Performance Composite Braking System'],
        sketchfabUrl: 'https://sketchfab.com/models/9fdb06fc4eab473ba03a77ebff527732/embed?autospin=1&autostart=1&preload=1&transparent=1',
    },
    {
        id: 'aston-martin-vantage',
        name: 'Vantage',
        brand: 'Aston Martin',
        year: 2024,
        price: '$153,900',
        priceNum: 153900,
        type: 'Sports Car',
        condition: 'Certified Pre-Owned',
        tagline: 'Beautiful is not enough.',
        description:
            'The Vantage is Aston Martin at its most instinctive — a true sports car with a 4.0L twin-turbo V8 sourced from AMG and a chassis tuned for pure driving pleasure. Every line is drawn to thrill, every surface sculpted to seduce.',
        image: '/cars/aston-martin-vantage-1.png',
        gallery: [
            '/cars/aston-martin-vantage-1.png',
            '/cars/aston-martin-vantage-2.png',
            '/cars/aston-martin-vantage-3.png',
            '/cars/aston-martin-vantage-4.png',
        ],
        specs: [
            { label: 'Engine', value: '4.0L Twin-Turbo V8 (Hand-built)' },
            { label: 'Horsepower', value: '503 HP @ 6,000 rpm' },
            { label: 'Torque', value: '505 lb-ft @ 2,000 rpm' },
            { label: '0-60 mph', value: '3.5s' },
            { label: 'Top Speed', value: '195 mph' },
            { label: 'Weight', value: '3,373 lbs' },
            { label: 'Transmission', value: '8-Speed ZF Automatic RWD' },
            { label: 'Exterior', value: 'Cinnabar Orange (Q Special)' },
            { label: 'Interior', value: 'Obsidian Black Leather / Coral Stitch' },
            { label: 'Mileage', value: '3,100 Miles' },
        ],
        features: ['Tech Collection Package', 'Aston Martin Premium Audio System', 'Sports Plus Collection', 'Q Special Paint Formulation', 'Ventilated Front Seats'],
        sketchfabUrl: 'https://sketchfab.com/models/75ca92f8d548470d83a7daaacb100bc5/embed?autospin=1&autostart=1&preload=1&transparent=1',
    },
];

export function getCarById(id: string): Car | undefined {
    return CARS.find((car) => car.id === id);
}

export function getCarsByBrand(brand: string): Car[] {
    return CARS.filter((car) => car.brand === brand);
}

export function getAllBrands(): string[] {
    return Array.from(new Set(CARS.map((car) => car.brand)));
}

export function getAllTypes(): string[] {
    return Array.from(new Set(CARS.map((car) => car.type)));
}
