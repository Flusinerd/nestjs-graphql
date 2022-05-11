import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Post } from '../post/post.model';
import { Profile } from '../profile/profile.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @Field(() => [Post], {nullable:true})
    posts?: Array<Post>;

    @Field(() => Profile, {nullable:true})
    profile?: Profile | null;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
