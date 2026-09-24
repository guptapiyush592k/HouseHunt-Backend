import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PropertyController } from './propert.controller.js';
import { PropertyService } from './property.service.js';
import { LoggerMiddleware } from '../common/middleware/logger.middleware.js';

@Module({
    exports: [],
    controllers: [PropertyController],
    providers: [PropertyService],
})
export class PropertyModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(PropertyController)

    }
}