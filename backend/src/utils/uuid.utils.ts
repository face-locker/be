import type { Uuid } from '../shared/domain/value-objects/uuid.vo';

export const emptyUuid = '00000000-0000-0000-0000-000000000000' as Uuid;

export function isNullUuid(uuid: Uuid | null | undefined): boolean {
  if (!uuid) {
    return true;
  }

  return uuid === emptyUuid;
}

export function validUUid(uuid?: string | null) {
  if (!uuid) {
    return false;
  }
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    uuid,
  );
}

export function generateUuid(): Uuid {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }) as Uuid;
}
