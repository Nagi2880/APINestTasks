import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb://localhost/nest'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
