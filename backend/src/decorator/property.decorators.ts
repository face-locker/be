import type { ApiPropertyOptions } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { getVariableName } from './utils';

export function ApiEnumProperty<TEnum>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type'> & { each?: boolean } = {},
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
  const enumValue = getEnum() as any;

  // Fix: ensure required is boolean, not string[]
  const { required, ...restOptions } = options;
  const normalizedRequired = Array.isArray(required) ? true : required;

  return ApiProperty({
    // throw error during the compilation of swagger
    // isArray: options.each,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enum: enumValue,
    enumName: getVariableName(getEnum),
    type: typeof Object.values(enumValue)[0] === 'number' ? 'number' : 'string',
    isArray: options.each,
    required: normalizedRequired,
    ...restOptions,
  });
}
