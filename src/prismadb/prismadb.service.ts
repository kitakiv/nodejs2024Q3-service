import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
config();

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:Str0ngP@ssw0rd@localhost:5432/nest?schema=public',
        },
      },
    });
  }
}
