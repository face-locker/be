import { ApiProperty } from '@nestjs/swagger';
import { Locker } from '../../domain/lockers';
import { LockerSizeVO } from '../../value-objects/locker-size.vo';
import { LockerStatusVO } from '../../value-objects/locker-status.vo';
import { DoorStateVO } from '../../value-objects/door-state.vo';

export class LockerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    example: 'LKR-001',
    description: 'Unique code for the locker',
  })
  code: string;

  @ApiProperty({
    example: 'First Floor - East Wing',
    description: 'Location of the locker',
  })
  location: string;

  @ApiProperty({
    example: 'SMALL',
    description: 'Size of the locker',
    enum: LockerSizeVO,
  })
  size: LockerSizeVO;

  @ApiProperty({
    example: 'ESP32-123456',
    description: 'Identifier for the associated ESP32 device',
  })
  esp32Id: string;

  @ApiProperty({
    example: 5,
    description: 'Relay pin number for the locker',
  })
  relayPin: number;

  @ApiProperty({
    example: 12,
    description: 'Sensor pin number for the locker',
  })
  sensorPin: number;

  @ApiProperty({
    example: 'IN_USE',
    description: 'Current status of the locker',
    enum: LockerStatusVO,
  })
  status: LockerStatusVO;

  @ApiProperty({
    example: 'OPEN',
    description: 'Current door state of the locker',
    enum: DoorStateVO,
  })
  doorState: DoorStateVO;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static fromDomain(locker: Locker): LockerResponseDto {
    return {
      id: locker.id,
      code: locker.code,
      location: locker.location,
      size: locker.size,
      esp32Id: locker.esp32Id,
      relayPin: locker.relayPin,
      sensorPin: locker.sensorPin,
      status: locker.status,
      doorState: locker.doorState,
      createdAt: locker.createdAt,
      updatedAt: locker.updatedAt,
    };
  }
}
