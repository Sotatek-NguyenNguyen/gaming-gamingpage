interface PaginateResponse<T> {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: T[];
}
