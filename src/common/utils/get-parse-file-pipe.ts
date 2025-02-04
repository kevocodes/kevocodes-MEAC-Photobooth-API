import {
  HttpStatus,
  ParseFilePipe,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { megBytesToBytes } from './bytes-to-mb';

interface ParseImagePipeOptions {
  required?: boolean;
  maxSize?: number;
}

export function getParseImagePipe({
  required = true,
  maxSize,
}: ParseImagePipeOptions = {}): ParseFilePipe {
  const parseFilePipeBuilder = new ParseFilePipeBuilder().addFileTypeValidator({
    fileType: '.(png|jpeg|jpg|webp)',
  });

  if (maxSize) {
    parseFilePipeBuilder.addMaxSizeValidator({
      maxSize: megBytesToBytes(maxSize),
      message: `File size must be less than ${maxSize} MB`,
    });
  }
  return parseFilePipeBuilder.build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    fileIsRequired: required,
  });
}
