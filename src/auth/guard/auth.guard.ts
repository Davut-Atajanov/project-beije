import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


export class JwtGuard extends AuthGuard('jwt') {
  constructor(){
    super();
  }
  canActivate(context: ExecutionContext) {
    // These are not necessary, I was tripping
    // const request = context.switchToHttp().getRequest();
    // const authHeader = request.headers.authorization;

    // if (authHeader && authHeader.startsWith('Bearer ')) {
    //   const token = authHeader.split(' ')[1];
    //   request.headers.authorization = `Bearer ${token}`;
    // }

    return super.canActivate(context);
  }
}
