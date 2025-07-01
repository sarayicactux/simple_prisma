import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    // اضافه کردن middleware برای soft delete
    this.addSoftDeleteMiddleware();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private addSoftDeleteMiddleware() {
    this.$use(async (params, next) => {
      const modelsWithSoftDelete = ['company', 'user', 'post'];

      if (modelsWithSoftDelete.includes(params.model?.toLowerCase() || '')) {
        if (params.action === 'findMany' || params.action === 'findFirst') {
          // اضافه کردن فیلتر deletedAt برای findMany و findFirst
          params.args.where = {
            ...params.args.where,
            deletedAt: null,
          };
        }

        if (params.action === 'count') {
          params.args.where = {
            ...params.args.where,
            deletedAt: null,
          };
        }

        if (params.action === 'delete') {
          // تبدیل delete به update برای soft delete
          params.action = 'update';
          params.args.data = {
            deletedAt: new Date(),
          };
        }

        if (params.action === 'deleteMany') {
          // تبدیل deleteMany به updateMany برای soft delete
          params.action = 'updateMany';
          params.args.data = {
            deletedAt: new Date(),
          };
        }
      }

      return next(params);
    });
  }

  // متدهای کمکی برای soft delete
  async softDelete(model: string, where: any) {
    return (this as any)[model].update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restore(model: string, where: any) {
    return (this as any)[model].update({
      where,
      data: {
        deletedAt: null,
      },
    });
  }

  async findWithDeleted(model: string, args: any = {}) {
    return (this as any)[model].findMany({
      ...args,
      where: {
        ...args.where,
        // حذف فیلتر deletedAt
      },
    });
  }

  async findOnlyDeleted(model: string, args: any = {}) {
    return (this as any)[model].findMany({
      ...args,
      where: {
        ...args.where,
        deletedAt: {
          not: null,
        },
      },
    });
  }

  async forceDelete(model: string, where: any) {
    // حذف واقعی از دیتابیس
    return (this as any)[model].delete({
      where,
    });
  }
}
