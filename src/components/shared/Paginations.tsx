import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import clsx from 'clsx';
import { getListPageFromTotalPage } from '../../utils/helper';

interface Props {
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  handleGoNext: () => void;
  handleGoPrevious: () => void;
  handleGoToPage: (page: number) => void;
}

const Paginations: React.FC<Props> = ({
  totalPages,
  currentPage,
  hasNext,
  hasPrevious,
  handleGoNext,
  handleGoPrevious,
  handleGoToPage,
}) => {
  if (totalPages === 1) {
    return null;
  }

  const listPage = getListPageFromTotalPage(totalPages);

  return (
    <ul className="flex items-center justify-center mb-4 text-white bg-transparent">
      {hasPrevious && (
        <li className={`mr-2 text-white bg-transparent cursor-pointer`} onClick={handleGoPrevious}>
          <FaCaretLeft />
        </li>
      )}

      {listPage.map((p) => (
        <li
          key={`page_${p}`}
          className={clsx(
            'flex items-center justify-center text-center w-10 h-10 mx-2 text-white',
            {
              'border bg-primary-600 border-black border-opacity-25 rounded-md': p === currentPage,
              'cursor-pointer': p !== currentPage,
            },
          )}
          onClick={() => {
            if (p !== currentPage) {
              handleGoToPage(p);
            }
          }}
        >
          <a className="flex items-center justify-center">{p}</a>
        </li>
      ))}

      {hasNext && (
        <li className={`ml-2 text-white bg-transparent cursor-pointer`} onClick={handleGoNext}>
          <FaCaretRight />
        </li>
      )}
    </ul>
  );
};

export default Paginations;
