export class PagedResponse<T> {
  readonly data: T[];

  readonly pageNumber: number;

  readonly pageSize: number;

  readonly totalRecords: number;

  readonly totalPages: number;
}
