import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return this.prisma.pedido.create({
      data: {
        ...createOrderDto
      }
    });
  }

  async findAll() {
    return this.prisma.pedido.findMany({
      include: {
        user:{
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.pedido.findMany({
      where: {
        user: {
          ativo: true,
        },
      },
      include: {
        user:{
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({where: {id}});
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.pedido.update({where: {id}, data: updateOrderDto});
  }

  remove(id: number) {
    return this.prisma.pedido.delete({where: {id}});
  }
}
