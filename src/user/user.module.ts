import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismadbModule } from 'src/prismadb/prismadb.module';

@Module({
  imports: [PrismadbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
