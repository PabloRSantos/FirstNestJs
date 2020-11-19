import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Message from './db/models/message.entity';
import User from './db/models/user.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Message) public readonly messageRepo: Repository<Message>,
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}
}

export default RepoService;