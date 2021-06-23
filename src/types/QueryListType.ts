export interface QueryListType<T> {
  total: number;
  items: T[];
  page: number;
  size: number;
}
