import React, { useMemo } from 'react';
import { EmptyState, ErrorBanner, RestaurantSkeleton } from './stateComponent';
import RestaurantCard from './restaurantCard';
import type { IRestaurantDto } from '../types/restaurantDto';

interface RestaurantListProps {
  restaurants: IRestaurantDto[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  search: string;
  hasMore: boolean;
  onEdit: (restaurant: IRestaurantDto) => void;
  onDelete: (id: string) => void;
  onView: (restaurant: IRestaurantDto) => void;
  onAdd: () => void;
  onRetry: () => void;
  onLoadMore: () => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  loading,
  error,
  search,
  onEdit,
  onDelete,
  onView,
  onAdd,
  onRetry,
}) => {
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return restaurants;
    return restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.contactInfo.toLowerCase().includes(q)
    );
  }, [restaurants, search]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <RestaurantSkeleton key={i} />
        ))}

        {!loading && error && (
          <ErrorBanner message={error} onRetry={onRetry} />
        )}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState isFiltered={!!search.trim()} onAdd={onAdd} />
        )}

        {!loading && !error && filtered.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    </main>
  );
};

export default RestaurantList;