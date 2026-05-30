import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

let counter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pr-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium
              animate-in slide-in-from-right-4 fade-in duration-300
              ${toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
              }
            `}
          >
            {toast.type === 'success'
              ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              : <XCircle className="w-5 h-5 flex-shrink-0" />
            }
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => dismiss(toast.id)}>
              <X className="w-4 h-4 opacity-70 hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};