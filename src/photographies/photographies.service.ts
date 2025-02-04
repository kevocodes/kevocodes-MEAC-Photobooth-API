import { Injectable, NotFoundException } from '@nestjs/common';
import { generateRandomAlphanumericCode } from 'src/common/utils/code-generator';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PhotographiesService {
  constructor(
    public readonly prismaService: PrismaService,
    public readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadPhotography(image: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadFile(image);

    const photography = await this.prismaService.photography.create({
      data: {
        url: uploadedImage.url,
        public_id: uploadedImage.public_id,
        width: uploadedImage.width,
        height: uploadedImage.height,
        code: generateRandomAlphanumericCode(),
      },
    });

    return {
      data: photography,
      message: 'Photography uploaded successfully',
    };
  }

  async getPhotographies() {
    const photographies = await this.prismaService.photography.findMany();

    return {
      data: photographies,
      message: 'Photographies retrieved successfully',
    };
  }

  async getPhotography(id: string) {
    const photography = await this.prismaService.photography.findUnique({
      where: {
        id,
      },
    });

    if (!photography) throw new NotFoundException('Photography not found');

    return {
      data: photography,
      message: 'Photography retrieved successfully',
    };
  }

  async getPhotographyByCode(code: string) {
    const photography = await this.prismaService.photography.findUnique({
      where: {
        code,
      },
    });

    if (!photography) throw new NotFoundException('Photography not found');

    return {
      data: photography,
      message: 'Photography retrieved successfully',
    };
  }

  async delete(id: string) {
    const photography = await this.prismaService.photography.findUnique({
      where: {
        id,
      },
    });

    if (!photography) throw new NotFoundException('Photography not found');

    await Promise.all([
      this.cloudinaryService.deleteFiles([photography.public_id]),
      this.prismaService.photography.delete({
        where: {
          id,
        },
      }),
    ]);

    return {
      message: 'Photography deleted successfully',
      data: null,
    };
  }
}
