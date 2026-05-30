import React, { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import Modal from './modal';

interface DeleteConfirmModalProps {
  open: boolean;
  restaurantName: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  restaurantName,
  onConfirm,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onCancel} maxWidth="sm">
      <div className="text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <Trash2 className="w-7 h-7 text-red-500" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-stone-800">Delete Restaurant?</h3>
          <p className="text-sm text-stone-500 mt-1">
            You're about to permanently delete{' '}
            <span className="font-semibold text-stone-700">"{restaurantName}"</span>.
            This cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 text-stone-600 text-sm font-semibold hover:bg-stone-50 transition-all disabled:opacity-50"
          >
            Keep it
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Deleting…</>
            ) : (
              'Yes, Delete'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;