import { Module } from '@nestjs/common';
import { AiSuggestionsController } from './ai-suggestions.controller';
import { AiSuggestionsService } from './ai-suggestions.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule,ConfigModule],
  controllers: [AiSuggestionsController],
  providers: [AiSuggestionsService],
})
export class AiSuggestionsModule {}
