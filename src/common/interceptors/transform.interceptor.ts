import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => ({
          status: "success",
          message: typeof data === "object" ? data.message : "",
          data: {
            result: data,
            count : Array.isArray(data) ? data.length : undefined
          }
        })),
      );
  }
}