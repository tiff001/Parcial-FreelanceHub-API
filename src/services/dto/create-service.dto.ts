import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Diseño de logo profesional' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Diseño', description: 'Diseño, Desarrollo, Marketing, Redacción' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Incluye 3 propuestas de logo en formato SVG y PNG' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @Min(0)
  price: number;
}