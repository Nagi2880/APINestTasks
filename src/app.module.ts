import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule,TasksModule, MongooseModule.forRoot('mongodb+srv://Nagi:rhfVzyT7TqtUtXA3@cluster0.zbfrl.mongodb.net/NestTaskDB?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
