import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServicesService } from '../services/services.service';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private servicesService: ServicesService) {}

  @Get('services')
  @ApiOperation({ summary: 'Listar todos los servicios — no requiere token' })
  @ApiResponse({ status: 200, description: 'Lista de servicios con nombre del freelancer' })
  findAll() {
    return this.servicesService.findAll();
  }
}