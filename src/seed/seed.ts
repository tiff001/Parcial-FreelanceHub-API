import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepo = app.get<Repository<User>>(getRepositoryToken(User));

  const existing = await userRepo.findOne({ where: { email: 'ana@freelancehub.com' } });
  if (!existing) {
    await userRepo.save([
      {
        email: 'ana@freelancehub.com',
        name: 'Ana García',
        password: '1234',
      },
      {
        email: 'carlos@freelancehub.com',
        name: 'Carlos López',
        password: '1234',
      },
    ]);
    console.log('Usuarios de seed insertados');
  } else {
    console.log('Los usuarios ya existen');
  }

  await app.close();
}
seed();