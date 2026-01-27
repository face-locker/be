import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { LockerStatusVO } from '../../value-objects/locker-status.vo';
import { LockerSizeVO } from '../../value-objects/locker-size.vo';
import { DoorStateVO } from '../../value-objects/door-state.vo';

export class LockerGetAllRequestDto {
  @ApiProperty({
    example: 1,
    description: 'Page number',
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Page size',
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @ApiPropertyOptional({
    example: 'AVAILABLE',
    description: 'Filter by locker status',
    enum: LockerStatusVO,
  })
  @IsOptional()
  @IsEnum(LockerStatusVO)
  status?: LockerStatusVO;

  @ApiPropertyOptional({
    example: 'SMALL',
    description: 'Filter by locker size',
    enum: LockerSizeVO,
  })
  @IsOptional()
  @IsEnum(LockerSizeVO)
  size?: LockerSizeVO;

  @ApiPropertyOptional({
    example: 'OPEN',
    description: 'Filter by door state',
    enum: DoorStateVO,
  })
  @IsOptional()
  @IsEnum(DoorStateVO)
  doorState?: DoorStateVO;

  @ApiPropertyOptional({
    example: 'First Floor',
    description: 'Filter by location (partial match)',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    example: 'LKR-001',
    description: 'Filter by code (partial match)',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    example: 'ESP32-123456',
    description: 'Filter by ESP32 ID (partial match)',
  })
  @IsOptional()
  @IsString()
  esp32Id?: string;
}
