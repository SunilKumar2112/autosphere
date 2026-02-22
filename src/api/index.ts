import { CARS, type Car } from '../data/cars';
import { REVIEWS, type ReviewData } from '../data/reviews';
import { BRANDS, type BrandData } from '../data/brands';
import { ENGINEERING_STATS, type StatData } from '../data/engineering';
import { STORY_STEPS, type StoryPanelData } from '../data/story';

/**
 * Simulated API Layer
 * 
 * Uses setTimeout to mimic network latency, preparing the application
 * for a real backend integration as per the @skills-first workflow.
 */

const DELAY_MS = 800;

export async function fetchFeaturedVehicles(): Promise<Car[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Return only a subset for the featured section
            resolve(CARS.slice(0, 6));
        }, DELAY_MS);
    });
}

export async function fetchAllVehicles(): Promise<Car[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(CARS);
        }, DELAY_MS);
    });
}

export async function fetchVehicleById(id: string): Promise<Car | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(CARS.find((car) => car.id === id));
        }, DELAY_MS);
    });
}

export async function fetchReviews(): Promise<ReviewData[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(REVIEWS);
        }, DELAY_MS);
    });
}

export async function fetchBrands(): Promise<BrandData[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(BRANDS);
        }, DELAY_MS);
    });
}

export async function fetchEngineeringStats(): Promise<StatData[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ENGINEERING_STATS);
        }, DELAY_MS);
    });
}

export async function fetchStorySteps(): Promise<StoryPanelData[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(STORY_STEPS);
        }, DELAY_MS);
    });
}
