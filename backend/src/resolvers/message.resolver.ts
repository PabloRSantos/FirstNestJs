import { 
   Args,
   Mutation,
   Parent,
   Query,
   ResolveField,
   Resolver,
   Subscription } from '@nestjs/graphql';
import Message from 'src/db/models/message.entity';
import User from 'src/db/models/user.entity';
import RepoService from 'src/repo.service';
import { PubSub } from 'graphql-subscriptions';
import {MessageInput, DeleteMessageInput } from './input/message.input';

const pubSub = new PubSub()

@Resolver(() => Message)
class MessageResolver {
   constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => Message, {nullable: true})
  public async getMessagesFromUser(@Args('user_id') userId: number): Promise<Message[]> {
    return  this.repoService.messageRepo.find({
        where: {
            userId
        }
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
      return this.repoService.messageRepo.findOne(id)
  }

  @Mutation(() => Message, { nullable: true })
  public async deleteMessage(@Args('data') input: DeleteMessageInput): Promise<Message> {
    const message = await this.repoService.messageRepo.findOne({ id: input.id, userId: input.userId })

    if(!message) throw new Error('You are not authorized to delete this message')

    await this.repoService.messageRepo.remove(message)

    return message
  }

  @Mutation(() => Message)
  public async createMessage(@Args('data') input: MessageInput): Promise<Message> {
      const message = this.repoService.messageRepo.create({ 
          content: input.content,
          userId: input.userId
        });

      const response = await this.repoService.messageRepo.save(message);

      pubSub.publish('messageAdded', {
        messageAdded: message
      })

      return response
  }

  @Subscription(() => Message)
  public messageAdded() {
    return pubSub.asyncIterator('messageAdded')
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Message): Promise<User> {
      return this.repoService.userRepo.findOne(parent.userId)
  }
}
export default MessageResolver;