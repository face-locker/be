import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequiredRoles } from 'src/guards/role-container';
import { RoleType } from 'src/guards/role-type';
import { LockerCreateRequestDto } from './dtos/requests/locker-create.request.dto';
import { LockerCreateCommand } from './cqrs/commands/implements/locker-create.command';

@Controller('lockers')
@ApiTags('Lockers')
@ApiBearerAuth()
export class LockersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new locker' })
  @ApiResponse({ status: 201, description: 'Locker created successfully.' })
  @RequiredRoles([RoleType.ADMIN])
  async createLocker(@Body() lockerCreateRequestDto: LockerCreateRequestDto) {
    await this.commandBus.execute(
      new LockerCreateCommand(
        LockerCreateRequestDto.toDomain(lockerCreateRequestDto),
      ),
    );
  }
}
