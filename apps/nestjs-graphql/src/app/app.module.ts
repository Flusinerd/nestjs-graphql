import { NestjsQueryFrameworkModule } from '@nestjs-query-framework';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';
import { AggregatePost } from '../graphql-schema/post/aggregate-post.output';
import { FindManyPostArgs } from '../graphql-schema/post/find-many-post.args';
import { FindUniquePostArgs } from '../graphql-schema/post/find-unique-post.args';
import { PostAggregateArgs } from '../graphql-schema/post/post-aggregate.args';
import { Post } from '../graphql-schema/post/post.model';
import { AggregateUser } from '../graphql-schema/user/aggregate-user.output';
import { FindManyUserArgs } from '../graphql-schema/user/find-many-user.args';
import { FindUniqueUserArgs } from '../graphql-schema/user/find-unique-user.args';
import { UserAggregateArgs } from '../graphql-schema/user/user-aggregate.args';
import { User } from '../graphql-schema/user/user.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    NestjsQueryFrameworkModule.forFeature({
      prisma: new PrismaClient(),
      entities: [
        {
          modelKey: 'user',
          DTO: User,
          FindManyArgsType: FindManyUserArgs,
          FindOneArgsType: FindUniqueUserArgs,
          AggregateType: AggregateUser,
          AggregateArgsType: UserAggregateArgs,
        },
        {
          modelKey: 'post',
          DTO: Post,
          FindManyArgsType: FindManyPostArgs,
          FindOneArgsType: FindUniquePostArgs,
          AggregateType: AggregatePost,
          AggregateArgsType: PostAggregateArgs,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
