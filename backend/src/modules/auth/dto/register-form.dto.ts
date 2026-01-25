import {
  IsString,
  IsEnum,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  MinLength,
} from 'class-validator';
import { RegisterForm } from '../domain/register-form';
import { Gender } from '../../user/domain/gender';
import { toLower } from 'lodash';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterFormDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  lastName: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @IsEnum(Gender)
  @ApiProperty({
    example: 'MALE',
    description: 'Gender of the user',
  })
  gender: Gender;

  @IsString()
  @IsDateString()
  @ApiProperty({
    example: '1990-01-01',
    description: 'Birthday of the user',
  })
  birthday: string;

  @IsString()
  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  phoneNumber: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'password123',
    description: 'Password for the user',
  })
  password: string;

  public static toRegisterForm(_this: RegisterFormDto): RegisterForm {
    return {
      ..._this,
      email: toLower(_this.email),
    };
  }
}
