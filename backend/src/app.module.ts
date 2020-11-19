import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'

import * as ormOption from './config/orm'

import RepoModule from './repo.module';
import MessageResolver from './resolvers/message.resolver';
import UserResolver from './resolvers/user.resolver';

const gqlImports = [
  UserResolver,
  MessageResolver
]

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOption),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql', // armazena os resolvers nesse arquivo
      playground: true
    })
  ],
})
export class AppModule {}
