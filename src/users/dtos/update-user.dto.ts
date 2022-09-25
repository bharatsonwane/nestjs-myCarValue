import { IsEmail, IsString, IsOptional } from 'class-validator'
// import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email: string;


    @IsString()
    @IsOptional()
    password: string
}