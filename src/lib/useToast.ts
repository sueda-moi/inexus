'use client';

import { toast } from 'react-toastify';

export const useToast = () => {
  return {
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
    warn: (msg: string) => toast.warn(msg),
    info: (msg: string) => toast.info(msg),
  };
};
