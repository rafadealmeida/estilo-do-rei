import { useState } from 'react';
import { AlertPropsFeedBack } from '@/@types/AlertProps';

export const useAlert = (
  initialState: AlertPropsFeedBack = {
    visible: false,
    status: '',
    message: '',
  },
) => {
  const [alert, setAlert] = useState<AlertPropsFeedBack>(initialState);

  const showAlert = (status: 'success' | 'error', message: string) => {
    setAlert({ visible: true, status, message });
    setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
  };

  return { alert, showAlert };
};
