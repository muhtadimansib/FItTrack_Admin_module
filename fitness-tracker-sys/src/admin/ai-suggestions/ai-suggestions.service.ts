
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pdfParse from 'pdf-parse';
import axios from 'axios';
import { readFile } from 'fs/promises';

@Injectable()
export class AiSuggestionsService {
  constructor(private readonly configService: ConfigService) {}

  async analyzePdf(file: Express.Multer.File): Promise<any> {
    try {
      const buffer = await readFile(file.path);
      const pdfData = await pdfParse(buffer);

      const prompt = `You are a fitness expert. Analyze this progress report and give improvement suggestions:\n\n${pdfData.text}\n\nSuggestions in JSON format like { "summary": "...", "recommendations": ["...", "..."] }`;

      const apiKey = this.configService.get<string>('TOGETHER_API_KEY');

      const response = await axios.post(
        'https://api.together.xyz/v1/chat/completions',
        {
          model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('PDF analysis failed');
    }
  }
}
