import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services.service';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publicar un servicio (requiere JWT)' })
  @ApiResponse({ status: 201, description: 'Servicio creado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() dto: CreateServiceDto, @Request() req) {
    return this.servicesService.create(dto, req.user.userId);
  }
}