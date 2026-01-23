import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { TypeOrmConfigService } from './typeorm-config.service';
import { DataSource } from 'typeorm/data-source/DataSource';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [ApiConfigService],
      dataSourceFactory: async (options: DataSourceOptions | undefined) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class TypeormModule {}
