import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: false,
    default: null,
    type: String,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: true, type: String, example: 'test@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
