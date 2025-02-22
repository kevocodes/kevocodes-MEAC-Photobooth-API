import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PhotographiesService } from './photographies.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ApiResponse } from '../common/types/response.type';
import { getParseImagePipe } from '../common/utils/get-parse-file-pipe';
import { MongoIdPipe } from '../common/pipes/mongo-id.pipe';

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

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['images'],
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadPhotographies(
    @UploadedFiles(getParseImagePipe())
    images: Express.Multer.File[],
  ): Promise<ApiResponse> {
    return await this.photographiesService.uploadPhotographies(images);
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

  @Delete('/all') 
  async deleteAll(): Promise<ApiResponse> {
    return await this.photographiesService.deleteAll();
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string): Promise<ApiResponse> {
    return await this.photographiesService.delete(id);
  }

}
