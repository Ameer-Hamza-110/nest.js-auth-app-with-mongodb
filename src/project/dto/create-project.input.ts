import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  coverImage: string;

  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  gallery: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @IsString({ each: true })
  technologies: string[];

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  liveUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_protocol: true })
  githubUrl?: string;
}
