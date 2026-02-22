import { useQuery } from '@tanstack/react-query';
import HeroBanner from '../components/sections/HeroBanner';
import StorySection from '../components/sections/StorySection';
import EngineeringSection from '../components/sections/EngineeringSection';
import BrandsSection from '../components/sections/BrandsSection';
import CollectionSection from '../components/sections/CollectionSection';
import ReviewsSection from '../components/sections/ReviewsSection';
import SEO from '../components/ui/SEO';

import {
    fetchFeaturedVehicles,
    fetchStorySteps,
    fetchEngineeringStats,
    fetchBrands,
    fetchReviews
} from '../api';

const HomePage = () => {
    // Parallel fetching for performance logic as per @skills-first
    const { data: vehiclesData, isPending: vehiclesLoading } = useQuery({ queryKey: ['featured-vehicles'], queryFn: fetchFeaturedVehicles });
    const { data: storyData, isPending: storyLoading } = useQuery({ queryKey: ['story-steps'], queryFn: fetchStorySteps });
    const { data: statsData, isPending: statsLoading } = useQuery({ queryKey: ['engineering-stats'], queryFn: fetchEngineeringStats });
    const { data: brandsData, isPending: brandsLoading } = useQuery({ queryKey: ['brands'], queryFn: fetchBrands });
    const { data: reviewsData, isPending: reviewsLoading } = useQuery({ queryKey: ['reviews'], queryFn: fetchReviews });

    return (
        <main>
            <SEO
                title="Home"
                description="AutoSphere: Curating extraordinary automobiles for the discerning collector. Explore our exclusive hypercars and supercars."
            />
            <HeroBanner />
            <StorySection steps={storyData} isLoading={storyLoading} />
            <EngineeringSection stats={statsData} isLoading={statsLoading} />
            <BrandsSection brands={brandsData} isLoading={brandsLoading} />
            <CollectionSection vehicles={vehiclesData} isLoading={vehiclesLoading} />
            <ReviewsSection reviews={reviewsData} isLoading={reviewsLoading} />
        </main>
    );
};

export default HomePage;
