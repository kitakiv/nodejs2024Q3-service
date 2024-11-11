import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getFavs() {
    return this.favsService.getFavs();
  }

  @Post('/track/:id')
  @HttpCode(201)
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addTrackToFavs(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteTrackFromFavs(id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addAlbumToFavs(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteAlbumFromFavs(id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addArtistToFavs(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteArtistFromFavs(id);
  }
}
