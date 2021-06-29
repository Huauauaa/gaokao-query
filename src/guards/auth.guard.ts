import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return validateRequest(request);
  }
}
function validateRequest(
  request: any,
): boolean | Promise<boolean> | Observable<boolean> {
  console.log('auth.guard.ts');
  // TODO: validate auth
  return true;
}
