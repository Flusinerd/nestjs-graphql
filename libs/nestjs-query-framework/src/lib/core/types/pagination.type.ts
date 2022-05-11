import { Field, InputType } from '@nestjs/graphql';
import { Int } from 'type-graphql';

@InputType('paging')
export class PagingGQLType {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}
