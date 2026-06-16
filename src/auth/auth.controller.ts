import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login con email y password — retorna JWT' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'ana@freelancehub.com' },
        password: { type: 'string', example: '1234' },
      },
    },
  })
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}