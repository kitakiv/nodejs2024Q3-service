import { IsBoolean, IsString } from 'class-validator';

class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export { CreateArtistDto };
