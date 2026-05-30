import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ChefHat } from 'lucide-react';
import ImageUpload from './imageUpload';
import type { IRestaurantDto } from '../types/restaurantDto';
import { restaurantSchema, type RestaurantFormValues } from '../lib/validations/restaurantValidation';

interface RestaurantFormProps {
  initialData?: IRestaurantDto | null;
  onSubmit: (data: RestaurantFormValues) => Promise<void>;
  onCancel: () => void;
  mode: 'add' | 'edit';
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  mode,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: initialData?.name || '',
      address: initialData?.address || '',
      contactInfo: initialData?.contactInfo || '',
      img: initialData?.img || '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        address: initialData.address,
        contactInfo: initialData.contactInfo,
        img: initialData.img || '',
      });
    } else {
      reset({ name: '', address: '', contactInfo: '', img: '' });
    }
  }, [initialData, reset]);

const handleFormSubmit = async (data: RestaurantFormValues) => {
  try {
    setSubmitting(true);
    await onSubmit(data);
  } finally {
    setSubmitting(false);
  }
};

  const inputClass = (hasError: boolean) => `
    w-full px-4 py-3 rounded-xl border-2 text-stone-800 text-sm font-medium
    bg-white placeholder-stone-300 outline-none transition-all duration-200
    ${hasError
      ? 'border-red-300 focus:border-red-500 bg-red-50'
      : 'border-stone-200 focus:border-amber-400 hover:border-stone-300'
    }
  `;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5" noValidate>
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-stone-100">
        <div className="p-2 rounded-lg bg-amber-100">
          <ChefHat className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-800">
            {mode === 'add' ? 'Add New Restaurant' : 'Edit Restaurant'}
          </h2>
          <p className="text-xs text-stone-400">
            {mode === 'add' ? 'Fill in the details below' : 'Update the restaurant information'}
          </p>
        </div>
      </div>

      {/* Image Upload */}
      <ImageUpload
        value={initialData?.img || ''}
        onChange={(url) => reset((prev) => ({ ...prev, img: url }))}
        error={errors.img?.message}
      />

      {/* Restaurant Name */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-stone-700 tracking-wide uppercase">
          Restaurant Name <span className="text-red-400">*</span>
        </label>
        <input
          {...register('name')}
          placeholder="e.g. The Spice Garden"
          className={inputClass(!!errors.name)}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-stone-700 tracking-wide uppercase">
          Address <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register('address')}
          rows={2}
          placeholder="e.g. 12 Main Street, Chennai, Tamil Nadu"
          className={`${inputClass(!!errors.address)} resize-none`}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Contact */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-stone-700 tracking-wide uppercase">
          Contact Number <span className="text-red-400">*</span>
        </label>
        <input
          {...register('contactInfo')}
          placeholder="e.g. +91 98765 43210"
          className={inputClass(!!errors.contactInfo)}
        />
        {errors.contactInfo && (
          <p className="text-xs text-red-500">{errors.contactInfo.message}</p>
        )}
      </div>

      {/* Server Error */}
      {serverError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {serverError}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 text-stone-600 text-sm font-semibold hover:bg-stone-50 hover:border-stone-300 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md shadow-amber-200"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {mode === 'add' ? 'Adding…' : 'Saving…'}
            </>
          ) : (
            mode === 'add' ? 'Add Restaurant' : 'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
};

export default RestaurantForm;