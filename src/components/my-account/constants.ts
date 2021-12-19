export interface IMyAccountNavbarMenu {
  name: string;
  key: string;
  enable: boolean;
  section?: string;
}

export const mcNavbarMenus: IMyAccountNavbarMenu[] = [
  {
    name: 'Transaction history',
    key: 'transaction-history',
    enable: true,
  },
  {
    name: 'Assets',
    key: 'assets',
    section: 'assets',
    enable: true,
  },
];
