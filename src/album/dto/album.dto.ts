import { IsNumber, IsOptional, IsString } from 'class-validator';

class CreateAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string | null;
}

export { CreateAlbumDto };
