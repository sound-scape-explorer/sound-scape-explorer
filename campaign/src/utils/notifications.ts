import {toast} from 'react-toastify';

export function notifyError(message: string) {
  toast.error(message, {position: 'bottom-right'});
}
