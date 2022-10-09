import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt-poo') {
  constructor() {
    super();
  }
}
