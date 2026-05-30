import React from 'react';
import { MapPin, Phone, Pencil, Trash2, Eye, UtensilsCrossed } from 'lucide-react';
import type { IRestaurantDto } from '../types/restaurantDto';

interface RestaurantCardProps {
  restaurant: IRestaurantDto;
  onEdit: (restaurant: IRestaurantDto) => void;
  onDelete: (id: string) => void;
  onView: (restaurant: IRestaurantDto) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
        {restaurant.img ? (
          <img
            src={restaurant.img}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UtensilsCrossed className="w-12 h-12 text-amber-300" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={() => onView(restaurant)}
            className="p-2 rounded-xl bg-white/90 backdrop-blur-sm text-stone-600 hover:text-amber-600 hover:bg-white shadow-md transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(restaurant)}
            className="p-2 rounded-xl bg-white/90 backdrop-blur-sm text-stone-600 hover:text-blue-600 hover:bg-white shadow-md transition-colors"
            title="Edit restaurant"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(restaurant.id)}
            className="p-2 rounded-xl bg-white/90 backdrop-blur-sm text-stone-600 hover:text-red-600 hover:bg-white shadow-md transition-colors"
            title="Delete restaurant"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-stone-800 text-lg leading-tight line-clamp-1">
            {restaurant.name}
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-stone-500">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
            <span className="text-sm line-clamp-2 leading-snug">{restaurant.address}</span>
          </div>

          <div className="flex items-center gap-2 text-stone-500">
            <Phone className="w-4 h-4 flex-shrink-0 text-amber-500" />
            <span className="text-sm font-medium">{restaurant.contactInfo}</span>
          </div>
        </div>

        {/* Footer actions — always visible on mobile */}
        <div className="flex gap-2 pt-1 border-t border-stone-50 sm:hidden">
          <button onClick={() => onView(restaurant)} className="flex-1 py-2 text-xs font-semibold text-stone-600 hover:text-amber-600 transition-colors">View</button>
          <button onClick={() => onEdit(restaurant)} className="flex-1 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
          <button onClick={() => onDelete(restaurant.id)} className="flex-1 py-2 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;