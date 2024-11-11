import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private database: DatabaseService) {}

  findAll() {
    return this.database.findAllArtist();
  }

  findOne(id: string) {
    return this.database.findOneArtist(id);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    return this.database.createArtist(createArtistDto);
  }

  updateArtist(artist: CreateArtistDto, artistId: string) {
    return this.database.updateArtist(artist, artistId);
  }

  removeArtist(id: string) {
    return this.database.deleteArtist(id);
  }
}
