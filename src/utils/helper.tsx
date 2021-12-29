import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Decimal from 'decimal.js';

const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const isSmallNumber = (val: number) => {
  return val < 0.001 && val > 0;
};

export const formatNumber = {
  format: (val?: number, useSmall?: boolean) => {
    if (!val && val !== 0) {
      return '--';
    }
    if (useSmall && isSmallNumber(val)) {
      return 0.001;
    }

    return numberFormatter.format(val);
  },
};

export const transformLamportsToSOL = (lamports: number): number => {
  return lamports / LAMPORTS_PER_SOL;
};

export const isEmpty = (str?: string | null): boolean => {
  if (!str) {
    return true;
  }
  return str.trim() === '';
};

export const matchYoutubeUrl = (url: any) => {
  const p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url && url.match(p)) {
    return url.match(p)[1];
  }
  return false;
};

export const getListPageFromTotalPage = (totalPage: number): number[] => {
  const listPage: number[] = [];
  let count = 1;

  while (count <= totalPage) {
    listPage.push(count);
    count++;
  }

  return listPage;
};

export const roundNumberByDecimal = (
  input: number | string | Decimal,
  decimal: number,
): Decimal => {
  return new Decimal(
    // tslint:disable-next-line:radix
    parseInt(new Decimal(input).times(Decimal.pow(10, decimal)).toString()),
  ).dividedBy(Decimal.pow(10, decimal));
};
