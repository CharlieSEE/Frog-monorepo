import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckBoxesGateway } from './checkboxes.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CheckBoxesGateway],
})
export class AppModule {}
