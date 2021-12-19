import React, { FC, useEffect, useState } from 'react';
import queryString from 'query-string';
import Spinner from '../shared/Spinner';

const TransactionsTable: FC = ({}) => {
  const [loading, setLoading] = useState(true);
  const [tabActive, setTabActive] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (parsed && parsed.section) {
      setTabActive(parsed.section.toString());
    } else {
      setTabActive('');
    }
  }, [location.search]);

  const renderTableTransactions = () => {
    return (
      <table className="w-full text-white table-fixed">
        <thead className={`border-b-2 border-white border-opacity-50`}>
          <tr className="text-lg">
            <th className="w-1/4 px-5 py-10 md:w-1/2 text-left">Transaction ID</th>
            <th className="hidden w-1/4 md:w-1/4 px-4 py-10 md:table-cell text-center">
              Deposit Amount
            </th>
            <th className="w-1/4 px-4 py-10 md:w-1/4 text-center">Created on</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white border-opacity-50 font-normal">
            <td className="px-5 py-6 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM
            </td>
            <td className="px-5 py-6 text-center">1000</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">1200</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">100</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">500</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">1040</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">200</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">800</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="h-20" />
        </tbody>
      </table>
    );
  };

  const renderTableAssets = () => {
    return (
      <table className="w-full text-white table-fixed">
        <thead className={`border-b-2 border-white border-opacity-50`}>
          <tr className="text-lg">
            <th className="w-1/4 px-5 py-10 md:w-1/4 text-left">Item ID</th>
            <th className="w-1/4 md:w-1/4 px-4 py-10 md:table-cell text-center">Amount</th>
            <th className="w-1/4 px-4 py-10 md:w-1/4 text-center">Added on</th>
            <th className="w-1/4 px-4 py-10 md:w-1/4 text-center">Expires on</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white border-opacity-50 font-normal">
            <td className="px-5 py-6 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM
            </td>
            <td className="px-5 py-6 text-center">1000</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">1200</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">100</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">500</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">1040</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">200</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="border-b border-white border-opacity-50">
            <td className="px-5 py-4 w-full truncate">
              BdW8REctpns392TFDXqaUs3V8HmE6itb6DfreLpBapBM212
            </td>
            <td className="px-5 py-4 text-center">800</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
            <td className="px-5 py-6 text-center">2021-11-18 11:29:00</td>
          </tr>
          <tr className="h-20" />
        </tbody>
      </table>
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-r-xl rounded-bl-xl bg-primary-100">
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <Spinner variant="alt" size="medium" />
        </div>
      )}
      {tabActive ? renderTableAssets() : renderTableTransactions()}
    </div>
  );
};

export default TransactionsTable;
