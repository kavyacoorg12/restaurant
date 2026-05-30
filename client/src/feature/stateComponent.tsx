import React from 'react';
import { UtensilsCrossed, Plus } from 'lucide-react';

// ─── Loading Skeleton ──────────────────────────────────────────
export const RestaurantSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 animate-pulse">
    <div className="h-44 bg-stone-200" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-stone-200 rounded-lg w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-stone-100 rounded-lg w-full" />
        <div className="h-4 bg-stone-100 rounded-lg w-2/3" />
        <div className="h-4 bg-stone-100 rounded-lg w-1/2" />
      </div>
    </div>
  </div>
);

// ─── Empty State ───────────────────────────────────────────────
interface EmptyStateProps {
  isFiltered: boolean;
  onAdd: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isFiltered, onAdd }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
    <div className="p-5 rounded-full bg-amber-50 mb-4">
      <UtensilsCrossed className="w-10 h-10 text-amber-300" />
    </div>

    {isFiltered ? (
      <>
        <h3 className="text-lg font-bold text-stone-700">No results found</h3>
        <p className="text-sm text-stone-400 mt-1 max-w-xs">
          Try adjusting your search term.
        </p>
      </>
    ) : (
      <>
        <h3 className="text-lg font-bold text-stone-700">No restaurants yet</h3>
        <p className="text-sm text-stone-400 mt-1 max-w-xs">
          Start building your directory by adding the first restaurant.
        </p>
        <button
          onClick={onAdd}
          className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all shadow-md shadow-amber-200"
        >
          <Plus className="w-4 h-4" />
          Add First Restaurant
        </button>
      </>
    )}
  </div>
);

// ─── Error Banner ──────────────────────────────────────────────
interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="p-4 rounded-full bg-red-50 mb-3">
      <UtensilsCrossed className="w-8 h-8 text-red-300" />
    </div>
    <p className="text-stone-600 font-medium">{message}</p>
    <button
      onClick={onRetry}
      className="mt-4 px-4 py-2 rounded-xl bg-stone-800 text-white text-sm font-semibold hover:bg-stone-700 transition-colors"
    >
      Retry
    </button>
  </div>
);