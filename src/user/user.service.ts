import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async findAll() {
    return await this.database.findAllUser();
  }

  async findOne(id: string) {
    return await this.database.findOneUser(id);
  }

  async create(user: CreateUserDto) {
    return await this.database.createUser(user);
  }

  async update(passwordFields: UpdatePasswordDto, userId: string) {
    return await this.database.updateUser(passwordFields, userId);
  }

  async delete(id: string) {
    return await this.database.deleteUser(id);
  }
}
