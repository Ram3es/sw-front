'use client'
import Toast from '@/components/Content/Toast';
import { useAppContext } from '@/context/AppContext';
import React from 'react';


const ToastManager = () => {
    const { listToasts, removeToast } = useAppContext()
    return (
            <div className='flex w-max flex-col gap-y-3 mt-2' >
                { listToasts.map(toast => (
                    <Toast 
                      key={toast.id}
                      type={toast.type} 
                      message={toast.message}
                      remove={() => removeToast(toast.id)}
                    />
                )) }
            </div>
    );
};

export default ToastManager;