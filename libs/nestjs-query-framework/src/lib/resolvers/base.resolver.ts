import { Provider } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { Class } from '../core/common/class.type';
import { getDTONames } from '../core/common/dto.utils';

export interface BaseResolver {
  prisma: PrismaClient;
  modelKey: string;
  DTOClass: Class<any>;
  singularName: string;
  pluralName: string;
}

export const BaseResolverFactory = <DTO>(
  prisma: PrismaClient,
  modelKey: string,
  DTOClass: Class<DTO>
) => {
  const names = getDTONames(DTOClass);
  const singularName = names.baseNameLower;
  const pluralName = names.pluralBaseNameLower;

  @Resolver(() => DTOClass)
  class BaseResolverMixin {
    prisma = prisma;
    modelKey = modelKey;
    singularName = singularName;
    pluralName = pluralName;
  }

  return BaseResolverMixin as Provider<any>;
};
