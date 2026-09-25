import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(
        exception: HttpException,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();

        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const message = typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message;


        response.status(statusCode).json({
            "success": false,
            "status": statusCode,
            "message": message,
            "path": request.originalUrl
        });
    }
}