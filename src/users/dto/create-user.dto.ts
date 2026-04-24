import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  idade: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
}