import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    
    const existingUser = await this.prisma.user.findUnique({
      where: { cpf: createUserDto.cpf },
    });
  
    if (existingUser) {
      throw new Error('CPF já cadastrado');
    }
  
    // 🔐 Criptografa a senha
    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);
  
    // 💾 Cria o usuário
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        senha: hashedPassword,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        idade: true,
        ativo: true,
      },
    });
  
    return user;
  }
  findAll() {
    return this.prisma.user.findMany({
      where: { ativo: true },
      select: {
        id: true,
        nome: true,
        email: true,
        idade: true,
        ativo: true,
      }, 
      
      
    });
    
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
  
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    if (updateUserDto.senha) {
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { senha, ...userSemSenha } = user;

    return userSemSenha;
  }

  remove(id: number) {
    
    return this.prisma.user.update({
      where: { id },
      data: { ativo: false },
    });
  }
}