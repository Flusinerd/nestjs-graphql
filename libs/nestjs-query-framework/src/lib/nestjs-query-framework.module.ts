import { DynamicModule } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Class } from './core/common/class.type';
import { ReadResolverFactory } from './resolvers/read.resolver';

export interface ModuleOptions {
  prisma: PrismaClient;
  entities: ReadResolverModuleOptions[];
}

export interface ReadResolverModuleOptions {
  modelKey: string;
  DTO: Class<unknown>;
  FindManyArgsType?: Class<unknown>;
  FindOneArgsType?: Class<unknown>;
  AggregateType: Class<unknown>;
  AggregateArgsType: Class<unknown>;
}

export class NestjsQueryFrameworkModule {
  static forFeature(opts: ModuleOptions): DynamicModule {
    const { prisma, entities } = opts;
    const resolvers = entities.map((entity) => {
      const {
        modelKey,
        DTO,
        FindManyArgsType,
        FindOneArgsType,
        AggregateType,
        AggregateArgsType,
      } = entity;
      return ReadResolverFactory({
        prisma,
        modelKey,
        DTO,
        FindManyArgsType,
        FindOneArgsType,
        AggregateType,
        AggregateArgsType,
      });
    });

    return {
      module: NestjsQueryFrameworkModule,
      providers: [...resolvers],
      imports: [],
      exports: [],
    };
  }
}
