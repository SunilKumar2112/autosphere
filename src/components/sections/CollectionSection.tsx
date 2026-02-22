import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithSkeleton from '../ui/ImageWithSkeleton';
import type { Car } from '../../data/cars';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleVehicleInGarage } from '../../store/garageSlice';
import './CollectionSection.css';

// ─── 1. Subcomponents ───

export function CollectionHeader({
    label,
    title,
    subtitle,
    actionText,
    actionLink,
}: {
    label: string;
    title: string;
    subtitle?: string;
    actionText?: string;
    actionLink?: string;
}) {
    return (
        <div className="collection-header">
            <p className="section-label">{label}</p>
            <h2 className="section-title">{title}</h2>
            {subtitle && (
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    {subtitle}
                </p>
            )}
            {actionText && actionLink ? (
                <Link to={actionLink} className="collection-view-all">
                    {actionText}
                </Link>
            ) : actionText ? (
                <button className="collection-view-all">{actionText}</button>
            ) : null}
        </div>
    );
}

export function CollectionGrid({ children }: { children: React.ReactNode }) {
    return <div className="collection-grid">{children}</div>;
}

export function CollectionCard({ vehicle }: { vehicle: Car }) {
    const dispatch = useAppDispatch();
    const savedVehicleIds = useAppSelector((state) => state.garage.savedVehicleIds);
    const isSaved = savedVehicleIds.includes(vehicle.id);

    const handleToggleGarage = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating to detail page if they just clicked 'heart'
        dispatch(toggleVehicleInGarage(vehicle.id));
    };

    return (
        <Link className="collection-card" to={`/vehicles/${vehicle.id}`}>
            <div className="collection-card-inner">
                {/* Image */}
                <ImageWithSkeleton
                    className="collection-card-img"
                    src={vehicle.image}
                    alt={vehicle.name}
                    loading="lazy"
                    width={1920}
                    height={3032}
                />

                {/* Gradient overlay with blur */}
                <div className="collection-card-gradient" />

                {/* Redux Garage Toggle Button */}
                <button
                    className={`garage-toggle-btn ${isSaved ? 'saved' : ''}`}
                    onClick={handleToggleGarage}
                    aria-label={isSaved ? "Remove from Garage" : "Add to Garage"}
                >
                    <svg viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>

                {/* Hover-reveal metadata pills */}
                <span className="collection-card-meta collection-card-meta--type">
                    {vehicle.type}
                </span>
                <span className="collection-card-meta collection-card-meta--brand">
                    {vehicle.brand}
                </span>
                <span className="collection-card-meta collection-card-meta--condition">
                    {vehicle.condition}
                </span>

                {/* Car name + price (always visible) */}
                <div className="collection-card-text">
                    <h3 className="collection-card-name">{vehicle.name}</h3>
                    <p className="collection-card-price">{vehicle.price}</p>
                </div>
            </div>
        </Link>
    );
}

export function CollectionRoot({
    id,
    children,
}: {
    id?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="collection-section" id={id}>
            {children}
        </section>
    );
}

// Export as a Compound Component
export const Collection = Object.assign(CollectionRoot, {
    Header: CollectionHeader,
    Grid: CollectionGrid,
    Card: CollectionCard,
});

// ─── 2. Usage Implementation ───

interface CollectionSectionProps {
    vehicles?: Car[];
    isLoading?: boolean;
}

const CollectionSection = ({ vehicles = [], isLoading = false }: CollectionSectionProps) => {
    return (
        <Collection id="models">
            <Collection.Header
                label="The Collection"
                title="Featured Vehicles"
                subtitle="Experience true driving excellence with vehicles crafted for performance and timeless design."
                actionText="View All"
                actionLink="/vehicles"
            />
            <Collection.Grid>
                {isLoading ? (
                    <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}>
                        Loading featured vehicles...
                    </div>
                ) : (
                    vehicles.map((car) => (
                        <Collection.Card key={car.id} vehicle={car} />
                    ))
                )}
            </Collection.Grid>
        </Collection>
    );
};

export default CollectionSection;
