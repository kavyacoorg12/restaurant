import React, { useState } from 'react';
import { useRestaurants } from '../hooks/useRestaurants';
import type { IRestaurantDto } from '../types/restaurantDto';
import { useToast } from './toast';
import RestaurantList from './restaurantList';
import Modal from './modal';
import RestaurantForm from './restaurantForm';
import ViewRestaurantModal from './viewRestaurantModal';
import DeleteConfirmModal from './deleteConfirmModal';
import Header from './header';
import type { RestaurantFormValues } from '../lib/validations/restaurantValidation';


type ModalState =
  | { type: 'add' }
  | { type: 'edit'; restaurant: IRestaurantDto }
  | { type: 'view'; restaurant: IRestaurantDto }
  | { type: 'delete'; restaurant: IRestaurantDto }
  | null;

const RestaurantsPage: React.FC = () => {
  const {
    restaurants,
    loading,
    loadingMore,
    error,
    hasMore,
    refetch,
    loadMore,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  } = useRestaurants();

  const { showToast } = useToast();
  const [modal, setModal] = useState<ModalState>(null);
  const [search, setSearch] = useState('');

  const closeModal = () => setModal(null);

 const handleAdd = async (data: RestaurantFormValues) => {
  try {
    await addRestaurant({
      name: data.name,
      address: data.address,
      contactInfo: data.contactInfo,
      img: data.img || '',
    });
    showToast('Restaurant added successfully!', 'success');
    closeModal();
  } catch (err: unknown) {
    const message =
      (err as { body?: { message?: string } })?.body?.message ||
      (err as { message?: string })?.message ||
      'Failed to add restaurant.';
    showToast(message, 'error');
  }
};

const handleEdit = async (data: RestaurantFormValues) => {
  if (modal?.type !== 'edit') return;
  try {
    await updateRestaurant(modal.restaurant.id, {
      name: data.name,
      address: data.address,
      contactInfo: data.contactInfo,
      img: data.img,
    });
    showToast('Restaurant updated successfully!', 'success');
    closeModal();
  } catch (err: unknown) {
    const message =
      (err as { body?: { message?: string } })?.body?.message ||
      (err as { message?: string })?.message ||
      'Failed to update restaurant.';
    showToast(message, 'error');
  }
};

const handleDelete = async () => {
  if (modal?.type !== 'delete') return;
  try {
    await deleteRestaurant(modal.restaurant.id);
    showToast('Restaurant deleted.', 'error');
    closeModal();
  } catch (err: unknown) {
    const message =
      (err as { body?: { message?: string } })?.body?.message ||
      (err as { message?: string })?.message ||
      'Failed to delete restaurant.';
    showToast(message, 'error');
  }
};
  return (
    <div className="min-h-screen bg-stone-50">
      <Header
        search={search}
        onSearchChange={setSearch}
        onAdd={() => setModal({ type: 'add' })}
        totalCount={restaurants.length}
      />

      <RestaurantList
        restaurants={restaurants}
        loading={loading}
        loadingMore={loadingMore}
        error={error}
        search={search}
        hasMore={hasMore}
        onEdit={(r) => setModal({ type: 'edit', restaurant: r })}
        onDelete={(id) => {
          const r = restaurants.find((x) => x.id === id);
          if (r) setModal({ type: 'delete', restaurant: r });
        }}
        onView={(r) => setModal({ type: 'view', restaurant: r })}
        onAdd={() => setModal({ type: 'add' })}
        onRetry={refetch}
        onLoadMore={loadMore}
      />

      {/* Add Modal */}
      <Modal open={modal?.type === 'add'} onClose={closeModal}>
        <RestaurantForm
          mode="add"
          initialData={null}
          onSubmit={handleAdd}
          onCancel={closeModal}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal open={modal?.type === 'edit'} onClose={closeModal}>
        <RestaurantForm
          mode="edit"
          initialData={modal?.type === 'edit' ? modal.restaurant : null}
          onSubmit={handleEdit}
          onCancel={closeModal}
        />
      </Modal>

      {/* View Modal */}
      <ViewRestaurantModal
        open={modal?.type === 'view'}
        restaurant={modal?.type === 'view' ? modal.restaurant : null}
        onClose={closeModal}
        onEdit={(r) => {
          closeModal();
          setTimeout(() => setModal({ type: 'edit', restaurant: r }), 150);
        }}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        open={modal?.type === 'delete'}
        restaurantName={modal?.type === 'delete' ? modal.restaurant.name : ''}
        onConfirm={handleDelete}
        onCancel={closeModal}
      />
    </div>
  );
};

export default RestaurantsPage;