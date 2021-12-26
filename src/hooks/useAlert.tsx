import { toast } from 'react-toastify';
import CloseIcon from '../components/shared/icons/Close';
import CheckedIcon from '../components/shared/icons/Checked';
import InfoIcon from '../components/shared/icons/Info';
import CloseWhiteIcon from '../components/shared/icons/CloseWhite';

export function useAlert() {
  const alertSuccess = (message: string) => {
    toast.success(
      <div className="flex items-start">
        <span className="text-sm tracking-normal">{message}</span>
      </div>,
      {
        icon: <CheckedIcon />,
        className: 'bg-primary-100 text-white font-normal',
        closeButton: <CloseWhiteIcon />,
      },
    );
  };

  const alertError = (message: string) => {
    toast.error(
      <div className="flex items-start">
        <span className="text-sm tracking-normal">{message}</span>
      </div>,
      {
        icon: <CloseIcon />,
        className: 'bg-primary-100 text-white font-normal',
        closeButton: <CloseWhiteIcon />,
      },
    );
  };

  const alertInfo = (message: string) => {
    toast.info(
      <div className="flex items-start">
        <span className="text-sm tracking-normal">{message}</span>
      </div>,
      {
        icon: <InfoIcon />,
        className: 'bg-primary-100 text-white font-normal',
        closeButton: <CloseWhiteIcon />,
      },
    );
  };

  const alertWarning = (message: string) => {
    toast.warning(
      <div className="flex items-start">
        <span className="text-sm tracking-normal">{message}</span>
      </div>,
      {
        icon: <InfoIcon />,
        className: 'bg-primary-100 text-white font-normal',
        closeButton: <CloseWhiteIcon />,
      },
    );
  };

  return {
    alertSuccess,
    alertError,
    alertInfo,
    alertWarning,
  };
}
