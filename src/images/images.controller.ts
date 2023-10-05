import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename: string = file.originalname.split('.')[0];
        const extension: string = file.originalname.split('.')[1];
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(null, `${filename}-${randomName}.${extension}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed file type'), false);
      }
    }
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
    ) {
      await this.imagesService.uploadFile({filename: file.filename});

      return res.status(HttpStatus.OK).json({
        message: 'File uploaded successfully',
        file: file.filename,
      });
    }

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
