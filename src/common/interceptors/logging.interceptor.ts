import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
import { tap } from 'rxjs';
  
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ) {
    const request = context.switchToHttp().getRequest();

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const timeTaken = Date.now() - startTime;

        console.log(
          `${request.method} ${request.originalUrl} completed in ${timeTaken}ms`,
        );
      }),
    );
  }
}