import clsx from 'clsx';
import Spinner from './Spinner';

interface Props {
  loading: boolean;
  // variant: 'confirm' | 'success';
  modalName: string;
  bodyContents?: {
    left: JSX.Element;
    right: JSX.Element;
  }[];
  handleConfirm?: (...args: any[]) => void;
  onClose?: (...args: any[]) => void;
  cancelText?: string;
  confirmText?: string;
  customBody?: JSX.Element;
  dense?: boolean;
  modalMW?: string;
  chargeLoading: boolean;
}

const BaseModal: React.FC<Props> = ({
  loading,
  // variant,
  modalName,
  bodyContents,
  handleConfirm,
  confirmText = 'CONFIRM',
  customBody,
  onClose,
  dense,
  modalMW = 'md:w-32rem',
  chargeLoading,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center w-full overflow-hidden rounded-2xl p-10 shadow-lg bg-primary-100 ${modalMW}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
          <Spinner size="medium" variant="basic" />
        </div>
      )}

      <div className="w-full font-bold text-xl text-white">{modalName}</div>
      <div className="w-full text-white mt-6">
        {customBody ? (
          customBody
        ) : (
          <div className="flex flex-col mb-4">
            {bodyContents &&
              bodyContents.map((ct, index) => (
                <div
                  key={index}
                  className={clsx(
                    'grid grid-cols-2 gap-4 px-4 text-sm text-white border-20459B border-b border-20459B',
                    {
                      'py-3': dense,
                      'py-4': !dense,
                    },
                  )}
                >
                  <div className="flex items-center justify-start w-full">{ct.left}</div>
                  <div className="flex items-center justify-end w-full">{ct.right}</div>
                </div>
              ))}
          </div>
        )}

        <div className="flex items-center justify-center w-full px-4">
          <button
            className="w-56 h-12 mt-8 text-white rounded-full font-semibold overflow-hidden text-base bg-primary-300 hover:bg-primary-100 transition-all"
            onClick={handleConfirm}
            disabled={chargeLoading}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
