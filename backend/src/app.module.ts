import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MediaServiceModule } from './modules/media-service/media-service.module';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { RolesGuard } from './guards/roles.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core/constants';
import { JwtAuthGuard } from './decorator/jwt-auth-guard';
import { LoggingExceptionFilter } from './filter/error-handling-exception-filter';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MediaServiceModule,
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: LoggingExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
