import { Bounce, toast } from 'react-toastify';

export const errorToast = (msg: string, closeTime: number) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: closeTime,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });
};

export const successToast = (msg: string, closeTime: number) => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: closeTime,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};
