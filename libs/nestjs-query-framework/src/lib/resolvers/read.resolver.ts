import { Provider } from '@nestjs/common';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { Class } from '../core/common/class.type';
import { getDTONames } from '../core/common/dto.utils';
import { generateInclude } from '../core/query/generate-include';
import { PrismaSelect } from '@paljs/plugins';
import { PagingGQLType } from '../core/types/pagination.type';

export const ReadResolverFactory = <
  DTO,
  FindManyArgsType,
  FindOneArgsType,
  AggregateType,
  AggregateArgsType
>(opts: {
  prisma: PrismaClient;
  modelKey: string;
  DTO: Class<DTO>;
  FindManyArgsType: Class<FindManyArgsType>;
  FindOneArgsType: Class<FindOneArgsType>;
  AggregateType: Class<AggregateType>;
  AggregateArgsType: Class<AggregateArgsType>;
}) => {
  const names = getDTONames(opts.DTO);

  @Resolver(() => opts.DTO)
  class ReadResolverMixin {
    prisma = opts.prisma;
    modelKey = opts.modelKey;

    @Query(() => [opts.DTO], { name: names.pluralBaseName })
    async readAll(
      @Info() info: GraphQLResolveInfo,
      @Args({ type: () => opts.FindManyArgsType }) args: FindManyArgsType
    ): Promise<DTO[]> {
      console.time('readAll');
      const select = new PrismaSelect(info).value;
      const res = await this.prisma[this.modelKey].findMany({
        ...args,
        ...select,
      });
      console.timeEnd('readAll');
      return res;
    }

    @Query(() => opts.DTO, { name: names.baseName })
    async readOne(
      @Args({ type: () => opts.FindOneArgsType }) args: FindOneArgsType,
      @Info() info: GraphQLResolveInfo
    ): Promise<DTO> {
      const select = new PrismaSelect(info).value;
      return await this.prisma[this.modelKey].findUnique({
        ...args,
        ...select,
      });
    }

    @Query(() => opts.AggregateType, {
      name: `aggregate${names.pluralBaseName}`,
    })
    async aggregate(
      @Args({ type: () => opts.AggregateArgsType }) args: AggregateArgsType
    ) {
      return await this.prisma[this.modelKey].aggregate(args);
    }
  }

  return ReadResolverMixin as Provider<any>;
};
