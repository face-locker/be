import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import { LockerGetAllRequestDto } from './dtos/requests/locker-get-all.request.dto';
import { LockersGetByFilters } from './cqrs/queries/implements/lockers-get-by-filters.query';
import { LockerGetByIdQuery } from './cqrs/queries/implements/locker-get-by-id.query';
import { PagedResponseDto } from 'src/shared/configuration/paged.response.dto';
import { LockerResponseDto } from './dtos/responses/locker.response.dto';
import { LockerUpdateRequestDto } from './dtos/requests/locker-update.request.dto';
import { LockerUpdateCommand } from './cqrs/commands/implements/locker-update.command';
import { LockerUpdateStateRequestDto } from './dtos/requests/locker-update-state.request.dto';
import { LockerUpdateStateCommand } from './cqrs/commands/implements/locker-update-state.command';
import { LockerDeleteCommand } from './cqrs/commands/implements/locker-delete.command';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { Locker } from './domain/lockers';

@Controller('lockers')
@ApiTags('Lockers')
@ApiBearerAuth()
export class LockersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Post('/filters')
  @ApiOperation({ summary: 'Get all lockers with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of lockers retrieved successfully.',
    type: PagedResponseDto<LockerResponseDto>,
  })
  @RequiredRoles([RoleType.ADMIN, RoleType.USER])
  async getAllLockers(
    @Body() query: LockerGetAllRequestDto,
  ): Promise<PagedResponseDto<LockerResponseDto>> {
    const { pageNumber, pageSize, ...filters } = query;

    return PagedResponseDto.fromDomain(
      await this.queryBus.execute(
        new LockersGetByFilters(pageNumber, pageSize, filters),
      ),
      (locker: Locker) => LockerResponseDto.fromDomain(locker),
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get locker by ID' })
  @ApiResponse({
    status: 200,
    description: 'Locker retrieved successfully.',
    type: LockerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Locker not found.' })
  @RequiredRoles([RoleType.ADMIN, RoleType.USER])
  async getLockerById(@Param('id') id: Uuid): Promise<LockerResponseDto> {
    return LockerResponseDto.fromDomain(
      await this.queryBus.execute(new LockerGetByIdQuery(id)),
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a locker' })
  @ApiResponse({ status: 200, description: 'Locker updated successfully.' })
  @ApiResponse({ status: 404, description: 'Locker not found.' })
  @RequiredRoles([RoleType.ADMIN])
  async updateLocker(
    @Param('id') id: Uuid,
    @Body() lockerUpdateRequestDto: LockerUpdateRequestDto,
  ) {
    await this.commandBus.execute(
      new LockerUpdateCommand(
        LockerUpdateRequestDto.toDomain(id, lockerUpdateRequestDto),
      ),
    );
  }

  @Patch('/:id/state')
  @ApiOperation({ summary: 'Update locker status and door state' })
  @ApiResponse({
    status: 200,
    description: 'Locker state updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Locker not found.' })
  @RequiredRoles([RoleType.ADMIN, RoleType.USER])
  async updateLockerState(
    @Param('id') id: Uuid,
    @Body() lockerUpdateStateRequestDto: LockerUpdateStateRequestDto,
  ) {
    await this.commandBus.execute(
      new LockerUpdateStateCommand(
        id,
        lockerUpdateStateRequestDto.status,
        lockerUpdateStateRequestDto.doorState,
      ),
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a locker' })
  @ApiResponse({ status: 200, description: 'Locker deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Locker not found.' })
  @RequiredRoles([RoleType.ADMIN])
  async deleteLocker(@Param('id') id: Uuid) {
    await this.commandBus.execute(new LockerDeleteCommand(id));
  }
}
