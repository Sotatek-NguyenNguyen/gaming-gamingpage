import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
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
    <ul className="flex items-center justify-center mt-6 mb-4 bg-transparent">
      {hasPrevious && (
        <li
          className={`mr-1 w-8 h-8 flex items-center justify-center text-primary-800 rounded-md cursor-pointer bg-primary-200`}
          onClick={handleGoPrevious}
        >
          <FaAngleLeft />
        </li>
      )}

      {listPage.map((p) => (
        <li
          key={`page_${p}`}
          className={clsx('flex items-center justify-center text-center w-8 h-8 mx-1 rounded-md', {
            'bg-primary-300 text-white': p === currentPage,
            'cursor-pointer bg-primary-200 text-primary-800': p !== currentPage,
          })}
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
        <li
          className={`ml-1 w-8 h-8 flex items-center justify-center text-primary-800 cursor-pointer bg-primary-200 rounded-md`}
          onClick={handleGoNext}
        >
          <FaAngleRight />
        </li>
      )}
    </ul>
  );
};

export default Paginations;
