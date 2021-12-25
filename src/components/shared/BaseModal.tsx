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
}) => {
  return (
    <div
      className={`relative flex flex-col items-center w-full overflow-hidden rounded-b-lg shadow-lg ${modalMW}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <Spinner size="medium" variant="basic" />
        </div>
      )}

      <div
        className={clsx(
          'flex items-center justify-center w-full px-4 py-8 uppercase text-lg text-white bg-primary-500 text-center',
        )}
      >
        {modalName}
      </div>
      <div className={clsx('w-full bg-primary-100 text-white p-4', {})}>
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

        <div className="flex items-center justify-center w-full mb-4 px-4">
          <button
            className="w-56 h-14 mt-6 uppercase text-white rounded-xl bg-transparent bg-opacity-70 hover:bg-secondary-100 border-3 border-primary-200 transition-all"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
