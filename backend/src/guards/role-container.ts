import { applyDecorators, SetMetadata } from '@nestjs/common';

import { RoleType } from './role-type';

function requireRole(roles: RoleType[]): MethodDecorator {
  return applyDecorators(SetMetadata('roles', roles));
}

export function RequireLoggedIn(): MethodDecorator {
  return requireRole([RoleType.USER, RoleType.ADMIN]);
}

export function RequiredRoles(roles: RoleType[]): MethodDecorator {
  return requireRole(roles);
}
