import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class ProfileCreateManyInput {

    @Field(() => String, {nullable:true})
    bio?: string;

    @Field(() => Int, {nullable:false})
    userId!: number;
}
