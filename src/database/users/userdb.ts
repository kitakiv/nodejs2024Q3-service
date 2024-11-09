import { User, UserObject } from '../interface/userinterface';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from '../../user/dto/user.dto';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
import { UserSecurity } from 'src/user/interface/interface';

class UserDB {
  private user: UserObject;
  constructor() {
    this.user = {
      ids: [],
      entries: {},
    };
  }

  getUser(id: string) {
    const user = this.user.entries[id];
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const UserSecurity = JSON.parse(JSON.stringify(user));
    delete UserSecurity.password;
    return UserSecurity;
  }

  createUser(user: CreateUserDto) {
    const id = uuid();
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const version = 1;
    this.user.ids.push(id);
    const userCreated = {
      id,
      login: user.login,
      password: user.password,
      version,
      createdAt,
      updatedAt,
    };
    this.user.entries[id] = userCreated;
    const userUpdated = JSON.parse(JSON.stringify(userCreated));
    delete userUpdated.password;
    return userUpdated;
  }

  findAll() {
    const users = Object.values(this.user.entries);
    return users.map((user) => {
      const UserSecurity = JSON.parse(JSON.stringify(user));
      delete UserSecurity.password;
      return UserSecurity;
    });
  }

  updateUser(passwordFields: UpdatePasswordDto, userId: string) {
    const { oldPassword, newPassword } = passwordFields;
    if (!this.user.entries[userId]) {
      throw new NotFoundException('User not found');
    }

    if (this.user.entries[userId].password !== oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    this.user.entries[userId].password = newPassword;
    this.user.entries[userId].updatedAt = Date.now();
    this.user.entries[userId].version++;
    const userUpdated = JSON.parse(JSON.stringify(this.user.entries[userId]));
    delete userUpdated.password;
    return userUpdated;
  }

  getUsers() {
    return this.user;
  }

  deleteUser(id: string) {
    const index = this.user.ids.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.user.ids.splice(index, 1);
    delete this.user.entries[id];
    return {};
  }
}

export default UserDB;
