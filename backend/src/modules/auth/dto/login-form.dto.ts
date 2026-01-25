import { IsEmail } from 'class-validator';
import { IsString } from 'class-validator';
import { LoginForm } from '../domain/login-form';
import { toLower } from 'lodash';
import { ApiProperty } from '@nestjs/swagger';

export class LoginFormDto {
  @IsEmail()
  @IsString()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'password123',
    description: 'Password for the user',
  })
  password: string;

  public static toLoginForm(dto: LoginFormDto): LoginForm {
    return {
      ...dto,
      email: toLower(dto.email),
    };
  }
}
