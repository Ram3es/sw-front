'use client'
import Toast from '@/components/Content/Toast';
import { useSettingsContext } from '@/context/SettingsContext';
import { IToast } from '@/types/Settings';
import React, { useEffect } from 'react';

interface IToastMngProps {
    toasts: IToast[]
}

const ToastManager = () => {
    const { listToasts, removeToast } = useSettingsContext()
    return (
        <div className='flex w-max flex-col gap-y-3 mt-2 fixed right-0 z-50' >
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