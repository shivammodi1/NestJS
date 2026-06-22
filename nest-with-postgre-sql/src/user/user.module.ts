import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
