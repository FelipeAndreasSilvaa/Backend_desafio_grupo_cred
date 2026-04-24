import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
      ) {}
    
  async signIn(email: string, senha: string): Promise<any> {
    const user = await this.prisma.user.findUnique({where: {email}});
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) throw new UnauthorizedException('Senha inválida');
    
    const payload = {
        sub: user.id,
        email: user.email,
      };
  
      return {
        access_token: this.jwtService.sign(payload),
      };
  }
}
