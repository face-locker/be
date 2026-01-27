import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { LockerStatusVO } from '../../value-objects/locker-status.vo';
import { DoorStateVO } from '../../value-objects/door-state.vo';

export class LockerUpdateStateRequestDto {
  @ApiPropertyOptional({
    example: 'AVAILABLE',
    description: 'Status of the locker',
    enum: LockerStatusVO,
  })
  @IsOptional()
  @IsEnum(LockerStatusVO)
  status?: LockerStatusVO;

  @ApiPropertyOptional({
    example: 'CLOSED',
    description: 'Door state of the locker',
    enum: DoorStateVO,
  })
  @IsOptional()
  @IsEnum(DoorStateVO)
  doorState?: DoorStateVO;
}
