import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotographiesService } from './photographies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/types/response.type';
import { getParseImagePipe } from 'src/common/utils/get-parse-file-pipe';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@Controller('photographies')
export class PhotographiesController {
  constructor(private readonly photographiesService: PhotographiesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['image'],
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadPhotography(
    @UploadedFile(getParseImagePipe())
    image: Express.Multer.File,
  ): Promise<ApiResponse> {
    return await this.photographiesService.uploadPhotography(image);
  }

  @Get()
  async getPhotographies(): Promise<ApiResponse> {
    return await this.photographiesService.getPhotographies();
  }

  @Get(':id')
  async getPhotography(
    @Param('id', MongoIdPipe) id: string,
  ): Promise<ApiResponse> {
    return await this.photographiesService.getPhotography(id);
  }

  @Get('code/:code')
  async getPhotographyByCode(
    @Param('code') code: string,
  ): Promise<ApiResponse> {
    return await this.photographiesService.getPhotographyByCode(code);
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string): Promise<ApiResponse> {
    return await this.photographiesService.delete(id);
  }
}
