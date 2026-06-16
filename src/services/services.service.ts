import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateServiceDto, userId: number): Promise<Service> {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const service = this.servicesRepository.create({
      ...dto,
      provider: user,
    });
    return this.servicesRepository.save(service);
  }

  async findAll(): Promise<any[]> {
    const services = await this.servicesRepository.find();
    return services.map((s) => ({
      id: s.id,
      title: s.title,
      category: s.category,
      price: s.price,
      freelancer: s.provider?.name,
    }));
  }
}