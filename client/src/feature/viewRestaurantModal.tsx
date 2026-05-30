import React from 'react';
import { MapPin, Phone, UtensilsCrossed, Calendar, Pencil } from 'lucide-react';
import Modal from './modal';
import type { IRestaurantDto } from '../types/restaurantDto';

interface ViewRestaurantModalProps {
  open: boolean;
  restaurant: IRestaurantDto | null;
  onClose: () => void;
  onEdit: (restaurant: IRestaurantDto) => void;
}


const ViewRestaurantModal: React.FC<ViewRestaurantModalProps> = ({
  open,
  restaurant,
  onClose,
  onEdit,
}) => {
  if (!restaurant) return null;

  const formattedDate = restaurant.createdAt
    ? new Date(restaurant.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <Modal open={open} onClose={onClose} maxWidth="md">
      <div className="space-y-5">
        {/* Image */}
        <div className="rounded-xl overflow-hidden h-52 bg-gradient-to-br from-amber-50 to-orange-100 -mx-2">
          {restaurant.img ? (
            <img
              src={restaurant.img}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UtensilsCrossed className="w-16 h-16 text-amber-200" />
            </div>
          )}
        </div>

        {/* Name */}
        <div>
          <h2 className="text-2xl font-bold text-stone-800">{restaurant.name}</h2>
          {formattedDate && (
            <div className="flex items-center gap-1.5 mt-1 text-stone-400 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              Added on {formattedDate}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-3 p-4 bg-stone-50 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 flex-shrink-0">
              <MapPin className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">Address</p>
              <p className="text-sm text-stone-700 font-medium mt-0.5">{restaurant.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 flex-shrink-0">
              <Phone className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">Contact</p>
              <p className="text-sm text-stone-700 font-medium mt-0.5">{restaurant.contactInfo}</p>
            </div>
          </div>
        </div>

        {/* Edit Action */}
        <button
          onClick={() => { onClose(); onEdit(restaurant); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all shadow-md shadow-amber-200"
        >
          <Pencil className="w-4 h-4" />
          Edit Restaurant
        </button>
      </div>
    </Modal>
  );
};

export default ViewRestaurantModal;