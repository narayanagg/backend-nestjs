import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
