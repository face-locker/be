import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { TypeormModule } from './infra/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Global()
@Module({
  imports: [
    TypeormModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class SharedModule {}
