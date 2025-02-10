import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onHide={() => setToast(null)} 
        />
      )}
    </ToastContext.Provider>
  );
}

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };
export default ToastProvider; 