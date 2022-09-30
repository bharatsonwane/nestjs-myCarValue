import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
    new(...args: any[]): {}
}

/** custom @decorator */
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializerInterceptor(dto));
}


export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: any) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        /** Run something before a request is handled by the request handler */
        // console.log("Running before the handler", context)

        return next.handle().pipe(
            map((data: any) => {
                /** Run something before the response is set out */
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        )
    }
}
