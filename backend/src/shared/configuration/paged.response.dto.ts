import { ApiProperty } from '@nestjs/swagger';
import { map } from 'lodash';

export class PagedResponseDto<TDto> {
  @ApiProperty()
  data: TDto[];

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  totalRecords: number;

  @ApiProperty()
  totalPages: number;

  static fromDomain<TDomain, TDto>(
    paged: {
      data: TDomain[];
      pageNumber: number;
      pageSize: number;
      totalRecords: number;
      totalPages: number;
    },
    mapper: (item: TDomain) => TDto,
  ): PagedResponseDto<TDto> {
    return {
      data: map(paged.data, mapper),
      pageNumber: paged.pageNumber,
      pageSize: paged.pageSize,
      totalRecords: paged.totalRecords,
      totalPages: paged.totalPages,
    };
  }
}
