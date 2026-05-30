import { useState, useEffect, useCallback } from 'react';
import type {  IAddRestaurantInput, IUpdateRestaurantInput } from '../types/restaurantType';
import type { IRestaurantDto } from '../types/restaurantDto';
import { restaurantApi } from '../services/api/api';

const PAGE_LIMIT = 12;

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurantDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const hasMore = nextCursor !== null;

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await restaurantApi.getRestaurants(null, PAGE_LIMIT);
        const responseData = res.data.data;
    if (!responseData) return;
      setRestaurants(responseData.restaurants);        // ← was: [...prev, ...responseData.restaurants]
    setNextCursor(responseData.nextCursor);
    } catch {
      setError('Failed to load restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    try {
      setLoadingMore(true);
      const res = await restaurantApi.getRestaurants(nextCursor, PAGE_LIMIT);
  const responseData = res.data.data;
    if (!responseData) return;
    setRestaurants((prev) => [...prev, ...responseData.restaurants]);
    setNextCursor(responseData.nextCursor);
    } catch {
      setError('Failed to load more restaurants.');
    } finally {
      setLoadingMore(false);
    }
  };

  const addRestaurant = async (data: IAddRestaurantInput) => {
    const res = await restaurantApi.addRestaurant(data);
    await fetchAll();
    return res;
  };

  const updateRestaurant = async (id: string, data: IUpdateRestaurantInput) => {
    const res = await restaurantApi.updateRestaurant(id, data);
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );
    return res;
  };

  const deleteRestaurant = async (id: string) => {
    const res = await restaurantApi.deleteRestaurant(id);
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
    return res;
  };

  return {
    restaurants,
    loading,
    loadingMore,
    error,
    hasMore,
    refetch: fetchAll,
    loadMore,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  };
};