import { IsString, IsNumber, IsOptional } from 'class-validator';

class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}

export { CreateTrackDto };
