import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  async findOne(id: number): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  }

  async create(data): Promise<any> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data): Promise<any> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<any> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
